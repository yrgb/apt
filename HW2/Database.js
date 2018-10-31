class Course
{
    constructor (id, time, date, classList)
    {
        this.id= id;
        this.time = time;
        this.date = date;
        this.classList = classList;
    }
    toString ()
    {
        return this.id+'';
    }
}
class Student
{
    constructor (id, name, gpa, courses)
    {
        this.id = id;
        this.name = name;
        this.gpa = gpa;
        this.courses = courses;
        
    }
    toString ()
    {
        return this.id+'';
    }
}

class Database
{
    constructor ()
      {
        this.courses =  new Map()
        this.students = new Map()
        this.readSData()
        this.readCData()
      }
           
     readSData ()
     {
        var url = "https://yrgp.github.io/apt/HW2/Students.txt"
        fetch(url)
        .then(res => res.text())
        .then(res => [this.addStudents(res)]) 
     }
     
    readCData()
    {
       var url = "https://yrgp.github.io/apt/HW2/Courses.txt"
       fetch(url)
       .then(res => res.text()) 
       .then(res => [this.addCourses(res)])
    }
    
    addStudents(txt)
     {
      let a = txt.split("\n");
	 
	  for (let line of a)
       {
          let b = line.split("\t");
          let id = b[0], name = b[1], gpa = b[2];
          let list = [];
          for (let i=3; i<b.length; i++){list.push(b[i]);}
          
     	  const std = new Student(id, name, gpa, list);
    	  this.students.set(std.id, std);
		}
            
	}

  addCourses(txt)
   {
  	
      let a = txt.split("\n");

      for (let line of a)
      {
           let b = line.split("\t");
           let id = b[0], time = b[1], date = b[2];
           let list = [];
           for (let i=3; i<b.length; i++){list.push(b[i]);}

           const course = new Course(id, time, date, list)
           this.courses.set(course.id, course)
      }

      // demo.innerHTML += "size:  "+ this.courses.size
   }

   //----------------------------------------islemler------------------------------------------------
  randomStd()
  {
      const keys = Array.from(this.students.keys())
      let key = keys[Math.trunc(keys.length * Math.random())];
      let std = this.students.get(key);
       return ("Random Student: "+std.name +" "+ std.id);
  }

  randomCourse()
  {
      const keys = Array.from(this.courses.keys())
      let key = keys[Math.trunc(keys.length * Math.random())];
      let c = this.courses.get(key);
      return ("Random Course: "+c.id);

  }

  findBestGpa()
  {
      const keys = Array.from(this.students.keys())

      let b = this.students.get(keys[0]);

      for (let std of this.students.values()) 
          if (std.gpa > b.gpa) b = std;

      return ("Best: "+b.id+" "+ b.name+" "+ b.gpa);
  }

  findAbv(gpa)
  {
    var c=0
    for (let std of this.students.values()) 
    {
      if(std.gpa>gpa)
      { c+=1}
    }  
     return ("Number of students above ("+gpa+") GPA is: "+c+ " Student.");

  }

  findUnder(gpa)
  {
    var c=0
    for (let std of this.students.values()) 
    {
      if(std.gpa<gpa)
      { c+=1}
    }  
     return ("Number of students under ("+gpa+") GPA is: "+c + " Student.");
       
  }
  
  findCourseStd(course)  //Gives students take given course
  {
  	var stds = ""
    for (let std of this.students.values())
      for (let d of std.courses)
        if(d==course)
        	stds+=std.id+"  "+std.name + "\n"
  
    return (stds);

  }

  findStdCourses(id) //Givs std's courses
  {	 
      let std=this.students.get(id);
      
 	  return ("Courses: "+std.courses);
  }

 findExam(id) 
  {   //Exam schedule for a given student 
    let std=this.students.get(id);
    
    let prog=std.id+" "+std.name+" Exam schedule: "

	let lessons=std.courses;

  for (let l of lessons)
   {
     let c=this.courses.get(l)

     prog+="\n"+c.id+" "+ c.time+ " "+ c.date+ " "+ c.classList;
   }
   
   return (prog);

  }
  
  findExamClassList(exam) 
  {
	let ex=this.courses.get(exam);
	let p=exam +" Exam rooms is: ";
	for (let e of ex.classList)
	   	p+= "\n"+ e;
	    

	return p;
  }
  
	  
  findCourseList(room) //Course list for a given exam room
	{
	 var counter=0
	 let list=room+ " room has: ";
	 for (let c of this.courses.values())
		for(let l of c.classList)
		  if(l==room)
		  	list+="\n"+c.id
	    
	  return list
	}
	
	findCourseListCounter(room) //Total number of courses in a given room
	{
	 var counter=0
	 let list=room+ " room has: ";
	 for (let c of this.courses.values())
		for(let l of c.classList)
		  if(l==room)
		  	counter+=1
	  

	  return counter
	}
	
	clr() // One more query of your choice

	{
		return ""
	}


}