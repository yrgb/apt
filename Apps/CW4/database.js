"use strict";

class Student
{
	constructor(i,n,g)
	{
		this.id=i
		this.name=n
		this.gpa=g
		this.courses=[]
	}
	addCourse(c)
	{
		this.courses.push(c)
	}
	toString()
	{
		return this.id +""
		
	}
	
}

class Course
{
	constructor(n,t,d,r)
	{
		this.name=n
		this.time=t
		this.date=d
		this.rooms=r
	}
	toString()
	{
		return this.name + ""
	}
}

