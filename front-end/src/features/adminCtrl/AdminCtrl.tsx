import React, {Fragment, useContext, useEffect} from 'react';
import { observer } from 'mobx-react-lite';
import { Segment } from 'semantic-ui-react';
import CoursesController from './CoursesController';
import {RootStoreContext} from "../../app/stores/rootStore";
import LoadingComponent from "../../app/layout/LoadingComponent";
import TagController from './TagController';

const AdminCtrl = () => {
    const rootStore = useContext(RootStoreContext);
    const {loadCourses,loadingInitial, courseRegistry} = rootStore.courseStore;
    const {loadTags, tagsAsArray, tagRegistry, loadingInitial: Li} = rootStore.tagStore
    const {loadUsers, loadingInitial: loadinguser} = rootStore.userStore;


    useEffect(() =>{
        loadCourses();
    }, [loadCourses])

    useEffect(() =>{
        loadTags();
    }, [loadTags])
    useEffect(() =>{
        loadUsers();
    }, [loadUsers])

    if (loadingInitial || Li || loadinguser) return <LoadingComponent inverted content='Loading'/>

    return (
       <Fragment>
           <Segment>
               Accress Controller(work in progress)
           </Segment>
           <Segment>
               <CoursesController courseRegistry={courseRegistry}/>
           </Segment>
           <Segment>
               <TagController/>
           </Segment>
       </Fragment>
    );
}

export default observer(AdminCtrl);