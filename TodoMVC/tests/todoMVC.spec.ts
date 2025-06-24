import { test, expect } from '@playwright/test';
import { TodoPage } from '../pom/todoPage';


test('test', async ({ page }) => {
    const todo = new TodoPage(page)
    const url = "https://demo.playwright.dev/todomvc/#/"
    const name1 = "first"
    const name2 = "second"

    await page.goto(url);

    //Ajouter 2 tâches
    await todo.addTask(name1);
    await todo.addTask(name2);
    expect(await todo.getNbTask() === 2);

    //Marquer la 2eme comme "Completed"
    await todo.gotoSection("Completed")
    expect(await todo.getNbTask() === 0);

    await todo.gotoSection("All");

    await todo.toggleTask(name2);
    await todo.gotoSection("Completed")
    expect(await todo.getNbTask() === 1);

    //Effectuer l'action "clear completed" à partir de la page "completed"
    await todo.clearCompleted();
    await todo.gotoSection("All")
    expect(await todo.getNbTask() === 1);

})