import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Topic } from '../topic.model';

@Component({
  selector: 'app-topic-selection',
  templateUrl: './topic-selection.component.html',
  styleUrls: ['./topic-selection.component.scss'],
})
export class TopicSelectionComponent {
  topics: Topic[] = [

      { id: 3, name: 'מערכת משוואות בשני נעלמים רמה קלה' },
      { id: 2, name: 'מערכת משוואות בשני נעלמים רמה בינונית' },
      { id: 1, name: 'מערכת משוואות בשני נעלמים רמה קשה' },
      { id: 5, name: 'חוק הפילוג המורחב רמה קלה' },
      { id: 4, name: 'חוק הפילוג המורחב  רמה קשה' },
      { id: 8, name: 'משוואה בנעלם אחד רמה קלה' },
      { id: 7, name: 'משוואה בנעלם אחד רמה בינונית' },
      { id: 6, name: 'משוואה בנעלם אחד רמה קשה' },
      { id: 10, name: "פיתגורס רמה קל" },
      { id: 9, name: 'פיתגורס רמה קשה' },
      { id: 11, name: 'מציאת קו ישר' },
      { id: 12, name: 'נקודות חיתוך עם הצירים' },
      { id: 16, name: 'נקודת מפגש 2 פונקציות' },
      { id: 15, name: "שטח משולש" }
  ];




  constructor(private router: Router) {}

  // Method to filter topics based on given IDs
  getTopicsByIds(ids: number[]): Topic[] {
    return this.topics.filter(topic => ids.includes(topic.id));
  }

  selectTopic(topic: Topic): void {
    localStorage.setItem('selectedTopic', JSON.stringify(topic));

    // Navigate based on topic ID
    switch(topic.id) {
      case 1: this.router.navigate(['/themes/equation-system-hard']); break;
      case 2: this.router.navigate(['/themes/equation-system-medium']); break;
      case 3: this.router.navigate(['/themes/equation-system-easy']); break;
      case 4: this.router.navigate(['themes/law-of-division-hard.component']); break;
      case 5: this.router.navigate(['themes/law-of-division-easy.component']); break;
      case 6: this.router.navigate(['themes/equation-in-one-vanishing-hard']); break;
      case 7: this.router.navigate(['themes/equation-in-one-vanishing-medium']); break;
      case 8: this.router.navigate(['themes/equation-in-one-vanishing-easy']); break;
      case 9: this.router.navigate(['themes/pythagoras-hard']); break;
      case 10: this.router.navigate(['themes/pythagoras-easy']); break;
      case 11: this.router.navigate(['themes/linear-line']); break;
      case 12: this.router.navigate(['themes/cutting-points']); break;
      case 15: this.router.navigate(['themes/easy-triangular-area']); break;
      case 16: this.router.navigate(['themes/meeting-point']); break;
      // Add more cases for other topic IDs if needed.
      default: console.error('Topic ID not mapped to a route.'); break;
    }
  }
}
