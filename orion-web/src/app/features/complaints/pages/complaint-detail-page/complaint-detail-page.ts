import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ComplaintStore } from '../../data-access/complaint.store';
import { map } from 'rxjs';
import { MATERIAL_IMPORTS } from '@app/shared/material.imports';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-complaint-detail-page',
  imports: [MATERIAL_IMPORTS, DatePipe],
  templateUrl: './complaint-detail-page.html',
  styleUrls: ['./complaint-detail-page.css'],
})
export class ComplaintDetailPage implements OnInit {
  private readonly route = inject(ActivatedRoute);
  readonly store = inject(ComplaintStore);

  ngOnInit(): void {
    this.route.data.pipe(map((data) => data['complaintData'])).subscribe((complaint) => {
      this.store.selectComplaint(complaint);
    });
  }
}
