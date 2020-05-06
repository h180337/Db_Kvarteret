import React, {Fragment, useContext, useEffect} from 'react';
import { observer } from 'mobx-react-lite';
import { Segment } from 'semantic-ui-react';
import CoursesController from './CoursesController';
import {RootStoreContext} from "../../app/stores/rootStore";
import LoadingComponent from "../../app/layout/LoadingComponent";
import TagController from './TagController';
import AccessController from './AccessController';

const AdminCtrl = () => {
    const rootStore = useContext(RootStoreContext);
    const {loadCourses,loadingInitial, courseRegistry} = rootStore.courseStore;
    const {loadTags, tagsAsArray, tagRegistry, loadingInitial: Li} = rootStore.tagStore
    const {loadUsers, loadingInitial: loadinguser} = rootStore.userStore;
    const {loadAccessGroups, loadingInitial: loadingAccessgroup, AccessGroupRegistry} = rootStore.accessGroupStore;



    useEffect(() =>{
        loadCourses();
    }, [loadCourses])

    useEffect(() =>{
        loadTags();
    }, [loadTags])
    useEffect(() =>{
        loadUsers();
    }, [loadUsers])
    useEffect(() =>{
        loadAccessGroups();
    }, [loadAccessGroups])

    if (loadingInitial || Li || loadinguser || loadingAccessgroup) return <LoadingComponent inverted content='Loading'/>

    return (
       <Fragment>
           <Segment>
               <AccessController accessGroupRegistry={AccessGroupRegistry}/>
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