import {Component, ElementRef, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ProductService} from '../../services/product.service';
import {Product} from '../../../shared/models/product';
import {CategoryService} from '../../../shared/services/category.service';
import {Observable, Subscription} from 'rxjs';
import {ImageUploadService} from '../../../shared/services/image-upload.service';
import {HttpEventType} from '@angular/common/http';
import {FormControl, NgForm, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {AppUser} from '../../../shared/models/app-user';
import {AuthService} from '../../../shared/services/auth.service';

@Component({
  selector: 'product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})

export class ProductFormComponent implements OnInit, OnDestroy {

  @ViewChild('form', {static: false}) private formElement: NgForm;
  @ViewChild('inputElement', {static: false}) private inputElement: ElementRef;
  @ViewChild('imageElement', {static: false}) private imageElement: ElementRef;

  categoryControl = new FormControl('', [Validators.required]);

  @Input() productId: string;

  appUser$ = {} as AppUser;
  product = { nutrition:{} } as Product;
  categories: Array<string> = [];
  categories$;

  uploadProgress$;
  tempImageUrl$;
  photoUploaded = false;
  selectedFile: File;

  private categoriesSubscription: Subscription = new Subscription();
  private appUserSubscription: Subscription = new Subscription();
  private productSubscription: Subscription = new Subscription();
  private UPLOAD_LINK = 'https://us-central1-fitx-beba9.cloudfunctions.net/uploadFile';

  constructor(private _productService: ProductService,
              private _categoriesService: CategoryService,
              private _uploadImageService: ImageUploadService,
              private _activatedRoute: ActivatedRoute,
              private _router: Router,
              private _auth: AuthService) {}

  ngOnInit() {
    this.categoriesSubscription = this._categoriesService
      .getAll().subscribe(categories => {
        this.categories$ = categories;
        this.categories$.map((category) => {
          this.categories.push(category.name);
      });
    });

    this.productId = this._activatedRoute.snapshot.paramMap.get('id');

    if (this.productId)
      this.productSubscription = this._productService.getProduct(this.productId)
      .subscribe(product => {
        if (product) this.fetchProduct(product);
        else this.noProduct();
      });

    this.appUserSubscription = this._auth.appUser$$
      .subscribe(appUser => this.appUser$ = appUser);
  }

  ngOnDestroy() {
    this.categoriesSubscription.unsubscribe();
    this.appUserSubscription.unsubscribe();
    this.productSubscription.unsubscribe();
  }

  public resetForm() {
    this.formElement.reset();
    this.inputElement.nativeElement.value = '';
    this.tempImageUrl$ = '';
    this.product.category = '';
  }

  onAccept() {
    this.productToLowerCase();
    if (this.productId) {
      this._productService.update(this.productId, this.product);
      this.navigateToProductsPage();
    } else this._productService.create(this.product, this.appUser$.isAdmin);
  }

  selectFileAndUpload(event) {
    this.onFileSelected(event);
    this.onUpload();
  }

  countCalories(): number {
    return this.product.nutrition.kcal =
        ((this.product.nutrition.proteins * 4) | 0)
      + ((this.product.nutrition.fats * 9) | 0)
      + ((this.product.nutrition.carbs * 4) | 0);
  }

  deleteProduct() {
    if (!confirm('Chcesz usunąć produkt?')) return;
    this._productService.remove(this.productId)
      .then(() => this.navigateToProductsPage());
  }

  get description() {
    return 'Nowy produkt musi poczekać na weryfikację administratora. Zwykle to długo nie trwa, dołóż swoją cegiełke dietetycznej społeczności ;)';
  }

  private onFileSelected(event) {
    this.selectedFile = event.target.files[0];
    this._uploadImageService.selectFile(event.target.files[0]);
  }

  private async onUpload() {
    await this._uploadImageService.uploadImage$(this.UPLOAD_LINK)
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

  private fetchProduct(product: Product) {
    this.product = product;
    this.tempImageUrl$ = product.imageUrl;
    this.photoUploaded = true;
  }

  private navigateToProductsPage() {
    this._router.navigate(['/produkty']);
  }

  private noProduct() {
    this.product = null;
  }

  private productToLowerCase() {
    this.product.name = this.product.name.charAt(0).toLowerCase() + this.product.name.substring(1)
  }
}
