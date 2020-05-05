import {RootStore} from "./rootStore";
import {action, observable, runInAction} from "mobx";
import agent from "../api/agent";

export default class CourseStore {

    rootStore: RootStore;

    constructor(rootStore: RootStore) {
        this.rootStore = rootStore
    }
    @observable loadingInitial = false;
    @observable courseRegistry = new Map();


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
}