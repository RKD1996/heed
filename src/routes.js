import signin from './components/access/Signin.vue'
import signup from './components/access/Signup.vue'
import Forgotpassword from './components/access/Forgotpassword'
import Home from './components/home/Home'
import Admin from './components/admin/Admin'
import Forum from './components/forum/Forum'
import Photo from './components/photo/Photo'
import PhotoGallery from './components/photo/PhotoInGallery'
import Sensor from './components/sensor/Sensor'
import IndividualSensor from './components/sensor/IndividualSensor'
import AggregateData from './components/sensor/Aggregate'

import ListofSurvey from './components/survey/Survey'
import Info from './components/info/Info'
import Contact from './components/contact/Contact'
import NewSurvey from './components/survey/NewSurvey'
import Survey from './components/survey/IndividualSurvey'
import ViewAnswer from './components/survey/ViewAnswer'
import Upload from './components/survey/Upload'
import Qt from './components/survey/QuestionTree'
import ForumTopic from './components/forum/ForumTopicThread'
import ThreadPost from './components/forum/PostThread'
import Blog from './components/blog/Blog'
import BlogPost from './components/blog/BlogPost'
import BlogCreate from './components/blog/BlogCreate'
import BlogEdit from './components/blog/BlogEdit'

import Test from './components/Test'
import Page404 from './components/shared/404.vue'





export default [
  {
    path: '/',
    component: signin
  },
  {path: '/signup', component: signup},
  {path: '/signin', component: signin},
  {path: '/forgotpassword', component: Forgotpassword},
  {path: '/home', component: Home},
  {path: '/admin', component: Admin},
  {path: '/forum', component: Forum},
  {path: '/photo', component: Photo},
  {path: '/sensor', component: Sensor},
  {path: '/blog', component: Blog},
  {path: '/blog/blogpost', component: BlogPost},
  {path: '/blog/blogcreate', component: BlogCreate},
  {
    path: '/blog/blogedit',
    component: BlogEdit,
    props:true
  },
  {
    path:'/sensor/:id/',
    component:IndividualSensor,
    props:true
  },
  {
    path:'/sensor/aggregate/:id',
    component:AggregateData,
    props:true
  },
  {path: '/survey', component: ListofSurvey},
  {path: '/info', component: Info},
  {path: '/contact', component: Contact},
  {path: '/survey/new', component: NewSurvey},

  {
    path: '/survey/:id',
    component: Survey,
    props:true
  },
  {
    path: '/survey/:id/viewanswer',
    component: ViewAnswer,
    props:true
  },
  {
    path: '/survey/:id/upload',
    component: Upload,
    props:true
  },
  {
    path: '/forum/:id/threads',
    component: ForumTopic,
    props:true
  },
  {
    path: '/forum/:topicId/thread/:id/posts',
    component: ThreadPost,
    props:true
  },
  ,
  {
    path: '/photo/gallery/:id/photos', component: PhotoGallery,name:PhotoGallery, props:true
  },
  {path: '/test', component: Test},
  {
    path: '*',
    component: Page404,

  }



    //children:[
      //{ path: '', component: Homes },

      //{ path: '/member/Homes', component: Homes },
      //{ path: '/member/Sensor', component: Sensor },
      //{ path: '/member/Survey', component: Survey },
      //{ path: '/member/Photos', component: Photos },
      //{ path: '/member/Forums', component: Forums },

      //{ path: '/member/Contact', component: Contact },
      //{ path: '/member/Info', component: Info }
    //]

]
