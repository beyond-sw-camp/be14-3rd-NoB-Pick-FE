// src/router/router.js
import { createRouter, createWebHistory } from 'vue-router'


const projectChildren = [
  {
    path: 'dashboard',
    name: 'ProjectDashboard',
    component: () => import('@/views/DashboardView.vue'),
  },
  {
    path: 'info',
    name: 'ProjectInfo',
    component: () => import('@/views/InfoView.vue'),
  },
  // {
  //   path: 'meeting',
  //   name: 'ProjectMeeting',
  //   component: () => import('@/views/project/MeetingView.vue'),
  // },
  // {
  //   path: 'members',
  //   name: 'ProjectMembers',
  //   component: () => import('@/views/project/MembersView.vue'),
  // },
  // {
  //   path: 'reviews',
  //   name: 'ProjectReviews',
  //   component: () => import('@/views/project/ReviewsView.vue'),
  // },
  // {
  //   path: 'issues',
  //   name: 'ProjectIssues',
  //   component: () => import('@/views/project/IssuesView.vue'),
  // },
  // {
  //   path: 'pr',
  //   name: 'ProjectPR',
  //   component: () => import('@/views/project/PRView.vue'),
  // },
  // {
  //   path: 'commit',
  //   name: 'ProjectCommit',
  //   component: () => import('@/views/project/CommitView.vue'),
  // },
 
];

const router = createRouter({
  history: createWebHistory(),

  routes : [
    {
      path: '/',
      name: 'Main',
      component: () => import('@/views/MainView.vue'),
    },
    {
      path: '/match',
      name: 'Match',
      component: () => import('@/views/MatchView.vue')
    },
    {
      path: '/projects',
      name: 'ProjectList',
      component: () => import('@/views/ProjectListView.vue'),
    },
    {
      path: '/project',
      name: 'Project',
      component: () => import('@/views/ProjectView.vue'),
      children: projectChildren
    },
    {
      path: '/board',
      name: 'Board',
      component: () => import('@/views/BoardView.vue'),
    },
    {
      path: '/badge',
      name: 'Badge',
      component: () => import('@/views/BadgeView.vue'),
    },
  ]
})

export default router;