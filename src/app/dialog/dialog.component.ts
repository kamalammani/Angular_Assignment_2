import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup,FormBuilder,Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material/dialog' 
@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})

export class DialogComponent implements OnInit {

  EmployeeForm !: FormGroup;
  actionBtn : string = "Save"
  constructor(private formBuilder : FormBuilder,
    private api : ApiService,
    @Inject(MAT_DIALOG_DATA) public editData : any, 
    private dialogRef : MatDialogRef<DialogComponent>) { }

  ngOnInit(): void {
   this.EmployeeForm = this.formBuilder.group({
    FirstName : ['',Validators.required],
    LastName : ['',Validators.required],
    Mobilenumber: ['',Validators.required],
    Location: ['',Validators.required],
    Qualification: ['',Validators.required],
  });

  if(this.editData){
    this.actionBtn = "Update";
    this.EmployeeForm.controls['FirstName'].setValue(this.editData.FirstName);
    this.EmployeeForm.controls['LastName'].setValue(this.editData.LastName);
    this.EmployeeForm.controls['Mobilenumber'].setValue(this.editData.Mobilenumber);
    this.EmployeeForm.controls['Location'].setValue(this.editData.Location);
    this.EmployeeForm.controls['Qualification'].setValue(this.editData.Qualification);
  }
}

addEmployee(){
  if(!this.editData){
    if(this.EmployeeForm.valid){
      this.api.postEmployee(this.EmployeeForm.value)
      .subscribe({
        next:(res)=>{
          alert("Employee details added successfully")
          this.EmployeeForm.reset();
          this.dialogRef.close('save');
        },
        error :()=>{
          alert("Error while adding the detais")
        }
      })
   }
  }
  else{
    this.updateEmployee()
  }

}

  updateEmployee(){
    this.api.putEmployee(this.EmployeeForm.value,this.editData.id)
    .subscribe({
      next : (res)=>{
        alert("Employee details updated successfully");
        this.EmployeeForm.reset();
        this.dialogRef.close('update');
      },
      error : ()=>{
        alert("Error while updating the employee detail");
      }
    })
  }

}

