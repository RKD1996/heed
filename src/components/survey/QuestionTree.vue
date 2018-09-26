<template>
  <div class="container">
    <tree :data="tree" :node-text="name"  layoutType="circular">
    </tree>
  </div>
</template>


<script>
import {tree} from 'vued3tree'

export default{
  components:{
    tree
  },
  
  data() {
    return {

      tree: {
        name: "father",
        children:[{
          name: "son1",
          children:[ {name: "grandson"}, {name: "grandson2"}]
        },{
          name: "son2",
          children:[ {name: "grandson3"}, {name: "grandson4"}]
        }]
      }
    }
  },

}
</script>
 <style>
  
    
    .node {
      opacity: 1;
    }

    .node circle {
      fill: #999;
      cursor: pointer;
    }

    .node text {
      font: 10px sans-serif;
      cursor: pointer;
    }

    .node--internal circle {
      fill: #555;
    }

    .node--internal text {
      text-shadow: 0 1px 0 #fff, 0 -1px 0 #fff, 1px 0 0 #fff, -1px 0 0 #fff;
    }

    .link {
      fill: none;
      stroke: #555;
      stroke-opacity: 0.4;
      stroke-width: 1.5px;
      stroke-dasharray: 1000;
    }

    .node:hover {
      pointer-events: all;
      stroke: #ff0000;
    }

    .node.highlight {
      fill: red;
    }
    
    .controls {
      position: fixed;
      top: 16px; 
      left: 16px;
      background: #f8f8f8;
      padding: 0.5rem;
      display: flex;
      flex-direction: column;
    }
    
    .controls > * + * {
      margin-top: 1rem;
    }
    
    label {
      display: block;
    }
    
    .list-enter-active, .list-leave-active {
      transition: all 1s;
    }
    .list-enter, .list-leave-to  {
      opacity: 0;
      transform: translateY(30px);
    }
    
    .line-enter-active, .line-leave-active {
      transition: all 2s;
      stroke-dashoffset: 0;
    }
    .line-enter, .line-leave-to  {
      stroke-dashoffset: 1000;
    }

  </style>
