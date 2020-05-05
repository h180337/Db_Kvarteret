import {RootStore} from "./rootStore";
import {action, observable, runInAction} from "mobx";
import agent from "../api/agent";
import {SyntheticEvent} from "react";
import {ITag} from "../models/Tag";
import {IPersonel} from "../models/personel";
import { ICourse } from "../models/Course";
import {toast} from "react-toastify";

export default class CourseStore {

    rootStore: RootStore;

    constructor(rootStore: RootStore) {
        this.rootStore = rootStore
    }
    @observable loadingInitial = false;
    @observable courseRegistry = new Map();
    @observable submitting = false;
    @observable target = '';

    getCourse = (id: string) =>{
        return this.courseRegistry.get(id);
    }

    @action loadCourses = async () => {
        this.loadingInitial = true;
        this.courseRegistry.clear()
        try {
            const courses = await agent.Courses.list();
            runInAction('loading course', () => {
                courses.forEach(course => {
                    this.courseRegistry.set(course.id, course)
                });
                this.loadingInitial = false

            })
        } catch (e) {
            runInAction('loading course error', () => {
                this.loadingInitial = false;
            })
            console.log(e);
        }
    }
    @action addCourseToUser = async (event: SyntheticEvent<HTMLButtonElement>, courseId: string,
                                  userId: string) => {
        this.submitting = true;
        this.target = event.currentTarget.name;
        let user:IPersonel = this.rootStore.userStore.getUser(userId)
        let course:ICourse = this.getCourse(courseId)
        try {
            await agent.Courses.addCourse(courseId, userId);
            runInAction('add course to user', () => {
                this.rootStore.userStore.userRegistry.set(userId, user);
                this.submitting = false;
                this.target = '';
            })
        } catch (e) {
            runInAction('error adding course', () => {
                this.submitting = false;
                this.target = '';
            })
        }
    }

    @action removeTag = async (courseId: string, userId: string) => {
        this.submitting = true;
        let user:IPersonel = this.rootStore.userStore.getUser(userId)
        try {
            await agent.Courses.removeCourse(courseId, userId);
            runInAction('remove Tag', () => {
                this.rootStore.userStore.userRegistry.set(userId, user);
                this.submitting = false;
            })
        } catch (e) {
            runInAction('error removing course', () => {
                this.submitting = false;
            });
        }
    }
}