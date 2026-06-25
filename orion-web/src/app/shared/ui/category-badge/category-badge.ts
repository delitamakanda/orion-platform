import { Component, input, computed } from '@angular/core';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-category-badge',
  imports: [MatIconModule, MatChipsModule],
  templateUrl: './category-badge.html',
  styleUrls: ['./category-badge.css'],
})
export class CategoryBadge {
  readonly category = input.required<string>();

  private readonly categoryIconMap: { keywords: string[]; icon: string }[] = [
    { keywords: ['violence'], icon: 'gavel' },
    { keywords: ['atteintes_aux_biens'], icon: 'local_hospital' },
    { keywords: ['suicide'], icon: 'sentiment_very_dissatisfied' },
    { keywords: ['cybercriminalite'], icon: 'security' },
    { keywords: ['trafic'], icon: 'local_shipping' },
    { keywords: ['discriminations'], icon: 'report_problem' },
    { keywords: ['fraude'], icon: 'account_balance' },
    { keywords: ['atteintes_a_l_environnement'], icon: 'eco' },
    { keywords: ['atteintes_a_la_personne'], icon: 'person' },
    { keywords: ['atteintes_a_la_liberte'], icon: 'gavel' },
    { keywords: ['atteintes_aux_animaux'], icon: 'pets' },
    { keywords: ['securite_routiere'], icon: 'directions_car' },
    { keywords: ['atteintes_aux_mineurs'], icon: 'child_care' },
    { keywords: ['crime_organise'], icon: 'gavel' },
    { keywords: ['atteintes_aux_personnes_vulnerables'], icon: 'gavel' },
    { keywords: ['other'], icon: 'help_outline' },
  ];

  readonly iconCategory = computed(() => {
    const cat = this.category().toLowerCase();
    const mapping = this.categoryIconMap.find((entry) => entry.keywords.includes(cat));
    return mapping ? mapping.icon : 'help_outline';
  });
}
