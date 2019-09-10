import {ChangeDetectorRef, Component, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {Observable} from 'rxjs';
import {SelectComponent} from 'ng2-select';

@Component({
  selector: 'dropdown-list',
  templateUrl: './dropdown-list.component.html',
  styleUrls: ['./dropdown-list.component.scss']
})
export class DropdownListComponent {

  @Input() public items$: Observable<string[]>;

  @Output() public item = new EventEmitter<string>();
  @Output() public error = new EventEmitter<boolean>();

  @ViewChild('ngSelectComponent', {static: false}) public ngSelect: SelectComponent;

  dirtyTouched: boolean;

  constructor(private _changeDetector: ChangeDetectorRef) {}

  public select(value: any) {
    this.ngSelect.active = [{id: value, text: value}];
  }

  public selected(value: any): void {
    this.item.emit(value.text);
  }

  public onClear() {
    this.ngSelect.active = [];
  }

  private isSelected(value: any): boolean {
    if (value) return true;
  }

  private onFocusOut(event: FocusEvent) {
    const value = (event.target as HTMLInputElement).textContent;
    if (!value) {
      this.dirtyTouched = true;
      this._changeDetector.detectChanges();
    } else {
      this.dirtyTouched = false;
      this._changeDetector.detectChanges();
    }
    this.error.emit(this.dirtyTouched);
  }
}
