import {RootStore} from "./rootStore";
import {action, computed, observable, runInAction} from "mobx";
import agent from "../api/agent";
import {ITag} from "../models/Tag";
import {toast} from "react-toastify";
import {SyntheticEvent} from "react";
import {v4 as uuid} from "uuid";

export default class TagStore {

    rootStore: RootStore;

    constructor(rootStore: RootStore) {
        this.rootStore = rootStore
    }

    @observable loadingInitial = false;
    @observable submitting = false;
    @observable target = '';
    @observable tagRegistry = new Map();
    @observable filteredData = new Map();

    getTag = (id: string) => {
        return this.tagRegistry.get(id);
    }

    @computed get tagsAsArray() {
        return Array.from(this.tagRegistry.values());
    }


    @action loadTags = async () => {
        this.loadingInitial = true;
        this.tagRegistry.clear()
        try {
            const tags = await agent.Tags.list();
            runInAction('loading tags', () => {
                tags.forEach(tag => {
                    this.tagRegistry.set(tag.id, tag)
                });
                this.loadingInitial = false

            })
        } catch (e) {
            runInAction('loading tags error', () => {
                this.loadingInitial = false;
            })
            console.log(e);
        }
    }

    @action createTag = async (tag: ITag) => {
        this.submitting = true;
        try {
            tag.id = uuid();
            await agent.Tags.create(tag);
            runInAction('createUser', () => {
                this.tagRegistry.set(tag.id, tag);
            });
            this.submitting = false;

        } catch (e) {
            runInAction('create tag error', () => {
                this.submitting = false;
            });
            toast.error('Problem submitting data')
            console.log(e)
        }
    }

    
}