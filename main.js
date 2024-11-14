var currentscreen = 0;
var currentassignments = [20, "2.1 Calc HW", "11/15/24"];
var wstart = "15:00";
var wend = "18:00";
var wday = 0;
var autofetch = false;
var autoschedule = false;
var autoscheduletime = 1;
var workassignment = currentassignments[1];
var autoassignedevent = false;
var uname;
var password;
function BootUp(){
    if (document.cookie == "remember=true") {
        document.getElementById("login").style.display = "none";
        document.getElementById("mainscreen").style.display = "flex";
    }
}
function LogIn(type) {
    if (type == 0) {
        let success = false;
        if ((uname) && (password)) {
            if ((uname == document.getElementById("uname").value) && (password == document.getElementById("password").value)) {
                document.getElementById("login").style.display = "none";
                document.getElementById("mainscreen").style.display = "flex";
                UpdateWorkPeriod();
                success = true;
            } else {
                alert("Incorrect Log-In Credentials");
            }
        } else {
            uname = document.getElementById("uname").value;
            password = document.getElementById("password").value;
            if ((uname !== "") && (password !== "")) {
                document.getElementById("login").style.display = "none";
                document.getElementById("mainscreen").style.display = "flex";
                UpdateWorkPeriod();
                success = true;
            }
        }
        if ((success == true) && (document.getElementById("remember").checked == true)) {
            document.cookie = "remember=true";
        } else {
            document.cookie = "remember=false";
        }
    } else {
        document.getElementById("login").style.display = "block";
        document.getElementById("mainscreen").style.display = "none";
        document.cookie = "remember=false";
        for (let i = 0; i < currentassignments.length / 3; i++) {
            document.getElementById("assignment" + i + "change").style.display = "none";
            document.getElementById("assignment" + i + "text").style.display = "block";
        }
    }
}
function RemoveAssignment(assignment) {
    var remove = document.getElementById("assignment" + assignment);
    remove.remove();
    currentassignments.splice(assignment, 3);
    UpdateWorkPeriod();
}
function AssignmentChange(type, assignment) {
    if (type == 0) {
        document.getElementById("assignment" + assignment + "change").style.display = "flex";
        document.getElementById("assignment" + assignment + "text").style.display = "none";
    } else if (type == 1) {
        if (document.getElementById("assignment" + assignment + "time").value !== "") {
            currentassignments[assignment] = parseFloat(document.getElementById("assignment" + assignment + "time").value);
            document.getElementById("assignment" + assignment + "change").style.display = "none";
            document.getElementById("assignment" + assignment + "text").style.display = "block";
            document.getElementById("assignment" + assignment + "text").innerHTML = currentassignments[assignment + 1] + " | " + currentassignments[assignment] + " mins | " + currentassignments[assignment + 2];
        }
    } else if (type == 2) {
        document.getElementById("assignment" + assignment + "change").style.display = "none";
        document.getElementById("assignment" + assignment + "text").style.display = "block";
    }
}
function AddTask(type) {
    if (type == 0) {
        document.getElementById("addtask").style.display = "block";
    } else if (type == 1) {
        let assname = document.getElementById("name").value;
        let assdate = document.getElementById("duedate").value;
        let asstime = document.getElementById("esttime").value;
        if ((assname !== "") && (assdate !== "")) {
            if (asstime !== "") {
                let newassnum = currentassignments.length;
                let newass = document.createElement("div");
                newass.setAttribute("id", "assignment" + newassnum);
                newass.setAttribute("class", "assignment");
                let element = document.getElementById("todo");
                element.appendChild(newass);
                let year = assdate.substr(2, 2);
                let month = assdate.substr(5, 2);
                let day = assdate.substr(8, 2);
                let formatassdate = month + "/" + day + "/" + year;
                currentassignments.push(asstime, assname, formatassdate);
                let assinnerhtml = "<p onclick='AssignmentChange(0, " + newassnum + ");' id='assignment" + newassnum + "text'>" + assname + " | " + asstime + " mins | " + formatassdate + "</p>" +
                    "<div id='assignment" + newassnum + "change' style='display: none;align-items: center;'>" +
                    "<p>" + assname + "</p>" +
                    "<input type='number' id='assignment" + newassnum + "time' name='assignment" + newassnum + "time' style='font-size: 1.75em;width: 2.5em;height: 1.75em;'><br><br>" +
                    "<p>mins</p>" +
                    "<input type='button' value='Save' style='font-size: 1.5em;width: 4em;height: 1.5em;margin-left: 1%;' onclick='AssignmentChange(1, " + newassnum + ");'>" +
                    "<input type='button' value='Cancel' style='font-size: 1.5em;width: 4em;height: 1.5em;margin-left: 1%;' onclick='AssignmentChange(2, " + newassnum + ");'>" +
                    "</div>" +
                    "<input class='removeass' type='button' value='X' onclick='RemoveAssignment(" + newassnum + ");'></input>";
                document.getElementById("assignment" + newassnum).innerHTML = assinnerhtml;
                document.getElementById("addtask").style.display = "none";
            }
        }
    } else if ((type == 2) && (autoassignedevent == false)) {
        autoassignedevent = true;
        let newassnum = currentassignments.length;
        let newass = document.createElement("div");
        newass.setAttribute("id", "assignment" + newassnum);
        newass.setAttribute("class", "assignment");
        let element = document.getElementById("todo");
        element.appendChild(newass);
        let year = "24";
        let month = "11";
        let day = "15";
        let formatassdate = month + "/" + day + "/" + year;
        let assname = "3.1 Physics Mastering";
        let asstime = "30";
        currentassignments.push(asstime, "3.1 Physics Mastering", formatassdate);
        let assinnerhtml = "<p onclick='AssignmentChange(0, " + newassnum + ");' id='assignment" + newassnum + "text'>" + assname + " | " + asstime + " mins | " + formatassdate + "</p>" +
            "<div id='assignment" + newassnum + "change' style='display: none;align-items: center;'>" +
            "<p>" + assname + "</p>" +
            "<input type='number' id='assignment" + newassnum + "time' name='assignment" + newassnum + "time' style='font-size: 1.75em;width: 2.5em;height: 1.75em;'><br><br>" +
            "<p>mins</p>" +
            "<input type='button' value='Save' style='font-size: 1.5em;width: 4em;height: 1.5em;margin-left: 1%;' onclick='AssignmentChange(1, " + newassnum + ");'>" +
            "<input type='button' value='Cancel' style='font-size: 1.5em;width: 4em;height: 1.5em;margin-left: 1%;' onclick='AssignmentChange(2, " + newassnum + ");'>" +
            "</div>" +
            "<input class='removeass' type='button' value='X' onclick='RemoveAssignment(" + newassnum + ");'></input>";
        document.getElementById("assignment" + newassnum).innerHTML = assinnerhtml;
    } else {
        document.getElementById("addtask").style.display = "none";
    }
}
function Settings(type) {
    if (type == 0) {
        document.getElementById("mainscreen").style.display = "none";
        document.getElementById("settings").style.display = "block";
    } else {
        if ((document.getElementById("wstime").value !== "") && (document.getElementById("wetime").value !== "")) {
            if ((document.getElementById("wdays").value !== "") && (document.getElementById("scheduletime").value !== "")) {
                wstart = document.getElementById("wstime").value;
                wend = document.getElementById("wetime").value;
                wday = document.getElementById("wdays").value;
                autofetch = document.getElementById("autofetch").checked;
                autoschedule = document.getElementById("autoschedule").checked;
                autoscheduletime = document.getElementById("scheduletime").value;
                document.getElementById("mainscreen").style.display = "flex";
                document.getElementById("settings").style.display = "none";
                UpdateWorkPeriod();
                if (autofetch == true) {
                    AddTask(2);
                }
            }
        }

    }
}
function UpdateWorkPeriod() {
    var d = new Date(); // for now
    let starthour = parseInt(wstart.substr(0, 2));
    let startminute = parseInt(wstart.substr(3, 2));
    let endhour = parseInt(wend.substr(0, 2));
    let endminute = parseInt(wend.substr(3, 2));
    let currenthour = d.getHours();
    let currentminute = d.getMinutes();
    if (starthour < endhour) {
        if (currenthour == starthour) {
            if (currentminute > startminute - 1) {
                WorkPeriodLogicUpdate(1);
            } else {
                WorkPeriodLogicUpdate(0);
            }
        } else if (currenthour > starthour) {
            if (currenthour < endhour) {
                WorkPeriodLogicUpdate(1);
            } else if ((currenthour == endhour) && (currentminute < endminute)) {
                WorkPeriodLogicUpdate(1);
            } else {
                WorkPeriodLogicUpdate(0);
            }
        } else {
            WorkPeriodLogicUpdate(0);
        }
    } else {
        if (currenthour == starthour) {
            if (currentminute > startminute - 1) {
                WorkPeriodLogicUpdate(1);
            } else {
                WorkPeriodLogicUpdate(0);
            }
        } else if ((currenthour > starthour) || (currenthour < endhour)) {
            WorkPeriodLogicUpdate(1);
        } else if ((currenthour == endhour) && (currentminute < endminute)) {
            WorkPeriodLogicUpdate(1);
        } else {
            WorkPeriodLogicUpdate(0);
        }
    }
}
function WorkPeriodLogicUpdate(type) {
    if (type == 0) {
        let hour = parseInt(wstart.substr(0, 2));
        if (hour > 12) {
            document.getElementById("workperiod").innerHTML = "Your Next Work Period is At: " + (parseInt(wstart.substr(0, 2)) - 12) + wstart.substr(2, 3) + " PM";
        } else if (hour == 0) {
            document.getElementById("workperiod").innerHTML = "Your Next Work Period is At: 12:00 AM";
        } else if (hour < 12) {
            document.getElementById("workperiod").innerHTML = "Your Next Work Period is At: " + wstart + " AM";
        } else {
            document.getElementById("workperiod").innerHTML = "Your Next Work Period is At: 12:00 PM";
        }
    } else {
        let hour = parseInt(wend.substr(0, 2));
        if (hour > 12) {
            document.getElementById("workperiod").innerHTML = "End of Work Period: " + (parseInt(wend.substr(0, 2)) - 12) + wend.substr(2, 3) + " PM";
        } else if (hour == 0) {
            document.getElementById("workperiod").innerHTML = "End of Work Period: 12:00 AM";
        } else if (hour < 12) {
            document.getElementById("workperiod").innerHTML = "End of Work Period: " + wend + " AM";
        } else {
            document.getElementById("workperiod").innerHTML = "End of Work Period: 12:00 PM";
        }
        if (autoschedule == true) {
            workassignment = currentassignments[1];
            if (workassignment) {
                document.getElementById("workperiod").innerHTML = document.getElementById("workperiod").innerHTML + " | Current Assignment: " + workassignment;
            }
        }
    }
}
function Examples(type){
    if(type==0){
        document.getElementById("ex1").style.display="block";
    }
    if(type==1){
        document.getElementById("ex2").style.display="block";
    }
    if(type==2){
        document.getElementById("ex3").style.display="block";
    }
}