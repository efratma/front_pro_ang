import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Topic } from '../topic.model';

@Component({
  selector: 'app-topic-selection',
  templateUrl: './topic-selection.component.html',
  styleUrls: ['./topic-selection.component.sass'],
})
export class TopicSelectionComponent {
  topics: Topic[] = [
    { id: 1, name: 'מערכת משוואות בשני נעלמים קשה' },
    { id: 2, name: 'מערכת משוואות בשני נעלמים בינונית' },
    { id: 3, name: 'מערכת משוואות בשני נעלמים קלה' },
    { id: 4, name: 'חוק הפילוג המורחב קשה' }, // Distributive property hard
    { id: 5, name: 'חוק הפילוג המורחב קלה' }, // Distributive property easy
    { id: 6, name: 'משוואה בנעלם אחד קשה' }, // Equation hard
    { id: 7, name: 'משוואה בנעלם אחד בינונית' }, // Equation medium
    { id: 8, name: 'משוואה בנעלם אחד קלה' }, // Equation easy
    { id: 9, name: 'פיתגורס קשה' }, // Pythagoras hard
    { id: 10, name: 'פיתגורס קל' }, // Pythagoras easy
    { id: 11, name: 'מציאת קו ישר' }, // Line equation
    { id: 12, name: 'נקודות חיתוך עם הצירים' }, // Cutting points with hinges
    { id: 13, name: 'שטח משולש קשה' }, // Triangle area hard
    { id: 14, name: 'שטח משולש בינוני' }, // Triangle area medium
    { id: 15, name: 'שטח משולש קל' }, // Triangle area easy
    { id: 16, name: 'נקודת מפגש 2 פונקציות' } // Meeting Point 2 functions
  ];

  constructor(private router: Router) {}

  selectTopic(topic: Topic): void {
    // Save the selected topic in a service or local storage
    localStorage.setItem('selectedTopic', JSON.stringify(topic));

    // Navigate to the difficult equation system component if the selected topic matches
    if (topic.id === 1) {
      this.router.navigate(['/themes/equation-system-hard']);
    }
    // Navigate to the medium equation system component if the selected topic matches
    if (topic.id === 2) {
      this.router.navigate(['/themes/equation-system-medium']);
    }
    if (topic.id === 3) {
      this.router.navigate(['/themes/equation-system-easy']);
    }
    if (topic.id === 4) {
      this.router.navigate(['themes/law-of-division-hard.component']);
    }
    if (topic.id === 5) {
      this.router.navigate(['themes/law-of-division-easy.component']);
    }

    if (topic.id === 6) {
      this.router.navigate(['themes/equation-in-one-vanishing-hard']);
    }

    if (topic.id === 7) {
      this.router.navigate(['themes/equation-in-one-vanishing-medium']);
    }

    if (topic.id === 8) {
      this.router.navigate(['themes/equation-in-one-vanishing-easy']);
    }

    if (topic.id === 10) {
      this.router.navigate(['themes/pythagoras-easy']);
    }

    if (topic.id === 9) {
      this.router.navigate(['themes/pythagoras-hard']);
    }

    if (topic.id === 11) {
      this.router.navigate(['themes/linear-line']);
    }
    if (topic.id === 12) {
      this.router.navigate(['themes/cutting-points']);
    }

    if (topic.id === 16) {
      this.router.navigate(['themes/meeting-point']);
    }

    if (topic.id === 15) {
      this.router.navigate(['themes/easy-triangular-area']);
    }


    // You can continue to add more cases for other topic IDs here.
  }
}
