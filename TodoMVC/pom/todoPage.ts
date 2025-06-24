import { expect, Locator, Page } from "@playwright/test";

export class TodoPage{
    readonly page: Page
    readonly todoField: Locator
    readonly todoList: Locator
    readonly filterField: Locator
    takeTaskParent : Locator 
    
    constructor(page:Page){
        this.page = page;
        this.todoField = page.locator(".new-todo");
        this.todoList = page.locator(".todo-list").locator(":scope > *");
        this.filterField = page.locator(".filters").locator(":scope > *"); 
    }
    
    async settakeTaskParent(name:string){
         this.takeTaskParent = this.page.getByText(name).locator('..');
    }
    
    async addTask(task : string){
        await this.todoField.fill(task)
        await this.todoField.press("Enter")
    }

    async toggleTask(name:string){
        this.settakeTaskParent(name);
        await (this.takeTaskParent).locator('input').check();
    }

    async destroyTask(name:string){
        this.settakeTaskParent(name);
        await (this.takeTaskParent).locator('button').click();
    }

    async gotoSection(section : "All"|"Active"|"Completed"){
       await this.filterField.getByText(section).click();
    }

    async clearCompleted(){
        await this.page.locator(".clear-completed").click();
        
    }


    async getNbTask(){
        return await this.todoList.count();
    }

}