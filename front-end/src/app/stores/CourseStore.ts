import {RootStore} from "./rootStore";
import {action, observable, runInAction} from "mobx";
import agent from "../api/agent";
import {SyntheticEvent} from "react";
import {ITag} from "../models/Tag";
import {IPersonel} from "../models/personel";
import { ICourse } from "../models/Course";
import {toast} from "react-toastify";
import {v4 as uuid} from "uuid";

export default class CourseStore {

    rootStore: RootStore;

    constructor(rootStore: RootStore) {
        this.rootStore = rootStore
    }
    @observable loadingInitial = false;
    @observable courseRegistry = new Map();
    @observable courseMembersRegistry = new Map();
    @observable MembersRegistrycourse = new Map();
    @observable submitting = false;
    @observable target = '';

    getCourse = (id: string) =>{
        const course:ICourse = this.courseRegistry.get(id);
        this.courseMembersRegistry.clear();
        course.members && course.members.forEach(member => {
            this.courseMembersRegistry.set(member.id, member)
        })
        return course
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
                course.members.push(user)
                user.courses.push(course)
                this.rootStore.userStore.userRegistry.set(userId, user)
                this.courseRegistry.set(courseId, course)
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

    @action removeCourse = async (courseId: string, userId: string) => {
        this.submitting = true;
        this.courseMembersRegistry.clear();
        let user:IPersonel = this.rootStore.userStore.getUser(userId)
        user.courses.forEach(course => {
            this.courseMembersRegistry.set(course.id, course)
        })
        let course:ICourse = this.getCourse(courseId)
        try {
            await agent.Courses.removeCourse(courseId, userId);
            runInAction('remove Tag', () => {
                this.courseMembersRegistry.delete(userId)
                course.members = Array.from(this.courseMembersRegistry.values())
                this.courseRegistry.set(courseId, course);
                this.courseMembersRegistry.delete(courseId)
                user.courses = Array.from(this.courseMembersRegistry.values())
                this.rootStore.userStore.userRegistry.set(userId, user);
                this.submitting = false;
            })
        } catch (e) {
            runInAction('error removing course', () => {
                this.submitting = false;
            });
        }
    }

    @action createCourse = async (course: ICourse) => {
        this.submitting = true;
        try {
            course.id = uuid();
            course.members = [];
            await agent.Courses.create(course);
            runInAction('create course', () => {
                this.courseRegistry.set(course.id, course);
            });
            this.submitting = false;
        } catch (e) {
            runInAction('create course error', () => {
                this.submitting = false;
            });
            console.log(e)
        }
    }
}