var parent= {


    value:'parentValue',
    obj: {
        objValue:'Parentobjvalue'
    },
    walk:function(){

        console.log("walking");
    }
}

console.log('parent value', parent.value);
console.log('parent obj value', parent.obj.objValue);

var child = Object.create(parent);


console.log('child value', child.value);
console.log('child obj value', child.obj.objValue);

console.log(child);
console.log(parent);
child.value='childvalue';
child.obj.objValue='childValue';
console.log("child values have been changed");
console.log('child value', child.value);
console.log('child obj value', child.obj.objValue);
console.log('parent value', parent.value);
console.log('parent obj value', parent.obj.objValue);

console.log(child);
console.log(parent);

var grandchild=Object.create(child);

child.value='childvalue2';

console.log("this is after creating grandchild and changing child value");
console.log(grandchild.value);
console.log(child.value);
console.log(parent.value);


grandchild.value='i am grandchild';

console.log('grandchild value', grandchild.value);
console.log('grandchild obj value', grandchild.obj.objValue);

console.log(grandchild.obj.objValue);
console.log(child.obj.objValue);
console.log(parent.obj.objValue);


console.log(grandchild.value);
console.log(child.value);
console.log(parent.value);


function Dog(name){

    this.name=name;
    console.log("my name is " + this.name);
    console.log("I am " + this);

}

var dog=new Dog("max");

var dog2= Dog("alice");
console.log(dog);
console.log(dog2);


var student1 = {
    message: "I LOVE this course!"
  };
  
  var student2 = Object.create(student1);
  student2.getMessage = function () {
    this.message = "Student 1 was paid off by Yaakov to say that!";
    return this.message;
  };
  var coverUp = student2.getMessage();
  console.log(student2.message);