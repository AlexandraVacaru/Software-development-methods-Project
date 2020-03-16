/*var firebaseConfig = {
    apiKey: "AIzaSyBNGSaU8suxm9TijMnnuQhf5_F5EYhD15c",
    authDomain: "fb-test-7fa0e.firebaseapp.com",
    databaseURL: "https://fb-test-7fa0e.firebaseio.com",
    projectId: "fb-test-7fa0e",
    storageBucket: "fb-test-7fa0e.appspot.com",
    messagingSenderId: "41776232925",
    appId: "1:41776232925:web:f725a2d6bddd3c56dc1e34",
    measurementId: "G-51XWRDLY73"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);*/
firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.
        document.getElementById("content_container").style.display = "block";
        document.getElementById("user_div").style.display = "none";
        document.getElementById("user_button").style.display = "none";
        

    } else {
      // No user is signed in.
        window.alert("You're not logged in!");
        document.getElementById("content_container").style.display = "none";
        document.getElementById("user_para").style.display = "block";
        document.getElementById("user_button").style.display = "block";

    }
  });

function addTask(){
    
    input_box = document.getElementById("input_box");
    
    if(input_box.value.length !=0){
        
        var key = firebase.database().ref().child("unfinished_task").push().key; 
        var task = {
            title: input_box.value,
            key : key
        }
        var updates = {};
        updates["/unfinished_task/" + key] = task;
        firebase.database().ref().update(updates);
        createTask();
    }

}

function createTask(){
    task_container = document.getElementsByClassName("container")[0];

    
    task_container.innerHTML = "";

    task_array = [];
    firebase.database().ref("unfinished_task").once('value',function(snapshot){
        snapshot.forEach(function(childSnapshot){
            var childData = childSnapshot.val();
            task_array.push(Object.values(childData));
        })

        for(var i, i = 0; i < task_array.length; i++){
            task_title = task_array[i][1];
            task_key = task_array[i][0];

            //Task data
            x = document.createElement("div");
            x.setAttribute("class","task_container");
            x.setAttribute("data-key",task_key);
            
            task_data = document.createElement("div");
            task_data.setAttribute("id","task_data");

            title = document.createElement("p");
            title.setAttribute("id","title");
            title.setAttribute("contenteditable",false);
            title.innerHTML = task_title;
           

            //Task tools
            task_tool = document.createElement("div");
            task_tool.setAttribute("id","task_tool");

            done_button = document.createElement("button");
            done_button.setAttribute("id","task_done_button");
            done_button.setAttribute("onclick","taskDone(this.parentElement.parentElement,this.parentElement)");
            fa_done = document.createElement("i");
            fa_done.setAttribute("class","fa fa-check");

            edit_button = document.createElement("button");
            edit_button.setAttribute("id","task_edit_button");
            edit_button.setAttribute("onclick","taskEdit(this.parentElement.parentElement,this)");
            fa_edit = document.createElement("i");
            fa_edit.setAttribute("class","fa fa-pencil");

            delete_button = document.createElement("button");
            delete_button.setAttribute("id","task_delete_button");
            delete_button.setAttribute("onclick","taskDelete(this.parentElement.parentElement)");
            fa_delete = document.createElement("i");
            fa_delete.setAttribute("class","fa fa-trash");

            task_container.append(x);
            x.append(task_data);
            task_data.append(title);

            x.append(task_tool);
            task_tool.append(done_button);
            done_button.append(fa_done);
            task_tool.append(edit_button);
            edit_button.append(fa_edit);
            task_tool.append(delete_button);
            delete_button.append(fa_delete);

           

            
        }
    })

}

function create_finished_task(){
    f_task_container = document.getElementsByClassName("container")[1];

    
    f_task_container.innerHTML = "";

    task2_array = [];
    
    firebase.database().ref("finished_task").once('value',function(snapshot){
        snapshot.forEach(function(childSnapshot){
            var childData = childSnapshot.val();
            task2_array.push(Object.values(childData));
            
        })
        

        for(let i = 0; i < task2_array.length; i++){
            task_title = task2_array[i][1];
            task_key = task2_array[i][0];


            //Task data
            x = document.createElement("div");
            x.setAttribute("class","task_container");
            x.setAttribute("data-key",task_key);
            
            task_data = document.createElement("div");
            task_data.setAttribute("id","task_data");

            title = document.createElement("p");
            title.setAttribute("id","title");
            title.setAttribute("contenteditable",false);
            title.innerHTML = task_title;
           

            f_task_container.append(x);
            x.append(task_data);
            task_data.append(title);

           

            
        }
    })

}



function taskDone(task,task_tool){
    finished_container = document.getElementsByClassName("container")[1];
    task.removeChild(task_tool);
    finished_container.append(task);

    var key = task.getAttribute("data-key");
    
    var task_obj = {
        title: task.childNodes[0].childNodes[0].innerHTML,
        key : key
    }
    var updates = {};
    updates["/finished_task/" + key] = task_obj;
    firebase.database().ref().update(updates);


    //delete from unfinished
    taskDelete(task);
    create_finished_task();
    
}

function taskEdit(task,edit_button){
    edit_button.style.backgroundColor = "yellow";
    edit_button.setAttribute("onclick","finish_edit(this.parentElement.parentElement,this)");


    title = task.childNodes[0].childNodes[0];
    title.setAttribute("contenteditable",true);
}
function finish_edit(task,edit_button){
    edit_button.style.backgroundColor = "white";

    title = task.childNodes[0].childNodes[0];
    title.setAttribute("contenteditable",false);

    //change in firebase
    var key = task.getAttribute("data-key");
    firebase.database().ref().child("unfinished_task").child(key).remove(); 
    var task_obj = {
        title: task.childNodes[0].childNodes[0].innerHTML,
        key : key
    }
    var updates = {};
    updates["/unfinished_task/" + key] = task_obj;
    firebase.database().ref().update(updates);

}


function taskDelete(task){
    key = task.getAttribute("data-key");
    task_to_remove = firebase.database().ref("unfinished_task/" + key);
    task_to_remove.remove();

    //remove from html
    task.remove();
}