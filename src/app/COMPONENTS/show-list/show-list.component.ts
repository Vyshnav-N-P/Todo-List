import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from '../../Service/api-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-show-list',
  templateUrl: './show-list.component.html',
  styleUrls: ['./show-list.component.scss'],
})
export class ShowListComponent implements OnInit {
  detail: any[] = [];
  tasks: any[] = [];
  isFormList: boolean = false;
  isTask: boolean = false;
  newListType: string = '';
  storedLists: any[] = [];

  constructor(private apiService: ApiServiceService, private router: Router) {}

  ngOnInit(): void {
    this.loadStoredLists();
  }

  loadStoredLists(): void {
    if (this.isLocalStorageAvailable()) {
      const storedLists = localStorage.getItem('Lists');
      if (storedLists) {
        this.detail = JSON.parse(storedLists);
        console.log(this.detail);
      } else {
        localStorage.clear();
        console.log('Fetching lists from API');
        this.getList();
      }
    }
  }

  isLocalStorageAvailable(): boolean {
    try {
      const test = '__test__';
      localStorage.setItem(test, test);
      localStorage.removeItem(test);
      return true;
    } catch (e) {
      return false;
    }
  }

  async getList(): Promise<void> {
    try {
      await this.apiService.showList();
      this.detail = this.apiService.list;
      if (this.isLocalStorageAvailable()) {
        localStorage.setItem('Lists', JSON.stringify(this.detail));
      }
    } catch (error) {
      console.error('Error fetching lists', error);
    }
  }

  sendData(value: string): void {
    console.log(value);
    this.newListType = value;
    this.handleCreate();
  }

  async handleCreate(): Promise<void> {
    if (this.newListType.trim()) {
      try {
        await this.apiService.createList(this.newListType);
        this.newListType = '';
        this.isFormList = false;
        if (this.isLocalStorageAvailable()) {
          localStorage.clear();
        }
        this.getList();
      } catch (error) {
        console.error('Error creating list', error);
      }
    } else {
      console.log('List name is empty');
      this.newListType = '';
      this.isFormList = false;
    }
  }

  onListClick(name: string): void {
    this.router.navigateByUrl(`${name}/tasks`);
  }

  async editList(name: string, id: string): Promise<void> {
    try {
      await this.apiService.editList(name, id);
      this.getList();
    } catch (error) {
      console.error('Error editing list', error);
    }
  }

  async deleteList(name: string): Promise<void> {
    try {
      await this.apiService.deleteList(name);
      this.storedLists = [];
      if (this.isLocalStorageAvailable()) {
        localStorage.clear();
      }
      this.getList();
    } catch (error) {
      console.error('Error deleting list', error);
    }
  }
}
