import { Component, Input } from '@angular/core';
import { ButtonSize } from '../../common/components/Button';

export interface CellData {
  type: ElemType;
  text: any;
  link?: string;
  className?: string;
  callback?: any;
}

export interface ColumnData {
  title: string;
  value?: string;
  width?: number;
  iconRender?: any;
  sorting?: any;
  columnSpan?: number;
}

export enum ElemType {
  Link = 0,
  Button = 1,
  Text = 2
}

@Component({
  selector: 'ausk-table',
  template: `
    <nz-table #nzTable [nzIsPagination]="false" [nzDataSource]="rows">
      <thead nz-thead>
      <tr>
        <th nz-th *ngFor="let column of columns; index as i;"
            [class]="'w-' + (columns.length === 2 ? 100 : 100 / columns.length) +
                  (column.columnSpan > 1 ? ' text-center' : '')"
            [attr.width]="column.width"
            [attr.colSpan]="column.columnSpan">
          {{column.title}}
          <ausk-link *ngIf="column.sorting" (click)="column.sorting($event, column.value)">
            <span [innerHTML]="column.iconRender(column.value)"></span>
          </ausk-link>
        </th>
      </tr>
      </thead>
      <tbody nz-tbody>
      <tr nz-tbody-tr *ngFor="let row of rows">
        <td nz-td *ngFor="let cell of row">
          <ausk-link *ngIf="cell.type === 0" [to]="cell.link">
            {{cell.text}}
          </ausk-link>

          <ausk-button *ngIf="cell.type === 1" [click]="cell.callback" [btnStyle]="cell.className" [btnSize]="buttonSize()">
            {{cell.text}}
          </ausk-button>

          <span *ngIf="cell.type === 2">
            {{cell.text}}
          </span>
        </td>
      </tr>
      </tbody>
    </nz-table>
  `
})
export default class Table {
  @Input() public className: string;
  @Input() public columns: any;
  @Input() public rows: CellData[];

  public buttonSize() {
    return ButtonSize.Small;
  }
}