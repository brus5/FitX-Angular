import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {ProductService} from '../../services/product.service';
import {Product} from '../../models/product';
import {ProductNutrition} from '../../models/product-nutrition';
import {CategoryService} from '../../services/category.service';
import {Observable} from 'rxjs';
import {ImageUploadService} from '../../services/image-upload.service';
import {HttpEventType} from '@angular/common/http';
import {NgForm} from '@angular/forms';
import {DropdownListComponent} from '../dropdown-list/dropdown-list.component';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})

export class ProductFormComponent implements OnInit {

  @ViewChild('form', {static: false}) private formElement: NgForm;
  @ViewChild('inputElement', {static: false}) private inputElement: ElementRef;
  @ViewChild('imageElement', {static: false}) private imageElement: ElementRef;
  @ViewChild('dropdownListComponent', {static: false}) private dropdownListComponent: DropdownListComponent;

  @Input() productId: string;

  product = {} as Product;
  nutrition = {} as ProductNutrition;
  categories: Array<string> = [];
  categories$;

  uploadProgress$;
  tempImageUrl$;
  photoUploaded = false;
  selectedFile: File;

  constructor(private _productService: ProductService,
              private _categoriesService: CategoryService,
              private _uploadImageService: ImageUploadService,
              private _activatedRoute: ActivatedRoute,
              private _router: Router) {}

  async ngOnInit() {
    await this._categoriesService.getAll().subscribe(categories => {
      this.categories$ = categories;
      this.categories$.map((category) => {
        this.categories.push(category.name);
      });
    });

    this.productId = this._activatedRoute.snapshot.paramMap.get('id');

    if (this.productId)
      this._productService.getProduct(this.productId)
      .subscribe(product => this.fetchProduct(product));
  }

  public resetForm() {
    this.formElement.reset();
    this.inputElement.nativeElement.value = '';
    this.tempImageUrl$ = '';
    this.dropdownListComponent.onClear();
  }

  save() {
    this.product.nutrition = this.nutrition;
    if (this.productId) {
      this._productService.update(this.productId, this.product);
      this._router.navigate(['/products']);
    } else this._productService.create(this.product);
  }

  onCategoryChoosed($event: string) {
    this.product.category = $event;
  }

  getCategories(): Observable<string[]> {
    return Observable.of(this.categories);
  }

  selectFileAndUpload(event) {
    this.onFileSelected(event);
    this.onUpload();
  }

  countCalories() {
    this.nutrition.kcal = (this.nutrition.proteins * 4) + (this.nutrition.fats * 9) + (this.nutrition.carbs * 4);
  }

  private onFileSelected(event) {
    this.selectedFile = event.target.files[0];
    this._uploadImageService.selectFile(event.target.files[0]);
  }

  private async onUpload() {
    await this._uploadImageService.uploadImage$()
      .subscribe(value => {
        if (value.type === HttpEventType.UploadProgress) {
          this.photoUploaded = false;
          this.uploadProgress$ = Math.round(value.loaded / value.total * 100);
        } else if (value.type === HttpEventType.Response) {
          this.tempImageUrl$ = value.body.tempImageUrl;
          this.product.imageUrl = value.body.imageUrl;
          this.photoUploaded = true;
        }
      });
  }

  private getCalories(): number {
    return this.nutrition.kcal;
  }

  private fetchProduct(product: Product) {
    this.product = product;
    this.nutrition = product.nutrition;
    this.tempImageUrl$ = product.imageUrl;
    this.dropdownListComponent.select(product.category);
    this.photoUploaded = true;
  }
}
