import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import *as bootstrap from 'bootstrap';
import { ProductService } from '../../services/product.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import * as XLSX from 'xlsx';
import { Xliff } from '@angular/compiler';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent {


  productForm!: FormGroup;



  constructor(
    private _product:ProductService,
    private _router:Router,
  ) { }

  ngOnInit(): void {

    
    this.setForm();
    this.getProducts();
    

  }
  setForm() {
    this.productForm = new FormGroup({
      productId: new FormControl(''),
      productName: new FormControl(''),
      productQnty: new FormControl(''),
      productRate: new FormControl(''),
      productCategory : new FormControl(''),
    })
  }

  productList: any = [];
  submit() {

    this._product.addNewProduct(this.productForm.value).subscribe({next:(resp)=>{
      console.log(resp);
      
      this.closeModal('addProductModal');
     this.productForm.reset();
    },error:(err)=>{
      
      this.closeModal('addProductModal');
      console.log(err);
      if(err.status==401){
        Swal.fire({
          title: "Unauthorized Access",
          text: 'Login Required!',
          icon: "error"
        }).then(()=>{
          
          this._router.navigate(['/'])

        })

      }else{
        Swal.fire({
          title: "Error",
          text: 'please contact Admin',
          icon: "error"
        });

      }
     
     
      

    }})

    this.productList.push(this.productForm.value);
      console.log(this.productList);

   
  
    
    

  }

  index:any;
  openModal(modalId:any,index ?:any){

    if(modalId=='UpdateModal' ){
      const item = this.productList.find((item: { _id: any; }) => item._id==index)
      if(item){
        this.productForm = new FormGroup({
          productId: new FormControl(item.productId),
          productName: new FormControl(item.productName),
          productQnty: new FormControl(item.productQnty),
          productRate: new FormControl(item.productRate),
          productCategory: new FormControl(item.productCategory),
        });
        
      }
    }
   
    this.index = index;
    const modalElement : any= document.getElementById(modalId);
    const modal = new bootstrap.Modal(modalElement);
    modal.show();
  }
  closeModal(modalId:any){

    const modalElement : any= document.getElementById(modalId);
    const modal =  bootstrap.Modal.getInstance(modalElement);
    if(modal){
    modal.hide();
    }
  }
  deleteModal(){

    
    
    console.log(this.productList)
    console.log(this.index)
    this._product.deleteItem(this.index).subscribe({next:(resp:any)=>{

      console.log(resp);

      const updatedData = this.productList.filter((item: { _id: any; }) => item._id != resp.result._id)

      this.productList = [];
      this.productList =  updatedData;
      

    },error:(err)=>{
      console.log(err);
    }})

    this.closeModal('DeleteModal')

  }
  updateModal(){

    console.log(this.productForm.value);
    this.productForm.value._id = this.index;
    console.log("testing....")
    this._product.updateProduct(this.productForm.value).subscribe({next:(resp)=>{
      console.log(resp);
      this.closeModal('UpdateModal')

      let indexNo = this.productList.findIndex((item: { _id: any; })=> item._id==this.index );
      console.log(indexNo)
      if(indexNo +1){
        this.productList[indexNo].productId=this.productForm.value.productId;
        this.productList[indexNo].productName=this.productForm.value.productName;
        this.productList[indexNo].productQnty=this.productForm.value.productQnty;
        this.productList[indexNo].productRate=this.productForm.value.productRate;
        this.productList[indexNo].productCategory=this.productForm.value.productCategory;

      }
      Swal.fire({
        title: "Updated",
        text: 'Successfully Updated!',
        icon: "success"
      })
      
      
      
    },error:(err)=>{
      console.log(err);
    }})
    
    
  }

  getProducts(){

    this._product.getAllProducts().subscribe({next:(resp)=>{
      console.log(resp);
      this.productList = resp;

    },error:(err)=>{
      console.log(err);
      if(err.status==401){
        Swal.fire({
          title: "Unauthorized Access",
          text: 'Login Required!',
          icon: "error"
        }).then(()=>{
          
          this._router.navigate(['/'])

        })

      }else{
        Swal.fire({
          title: "Error",
          text: 'please contact Admin',
          icon: "error"
        }).then(()=>{
          
          this._router.navigate(['/'])

        })


      }
    
    }})
  }

  download(){

    const ele = document.getElementById('product');

    const ws:XLSX.WorkSheet = XLSX.utils.table_to_sheet(ele);

    const wb:XLSX.WorkBook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(wb,ws,'Sheet1');

    XLSX.writeFile(wb,'download.xlsx');


  }
  downloadFromServer(){

    this._product.getDownload().subscribe({next:(resp:Blob)=>{
      console.log(resp);

      saveAs(resp, 'data.xlsx');
    },error:(err)=>{
      console.log(err)
    }})

  }
  

}
  

