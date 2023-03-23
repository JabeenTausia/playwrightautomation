const {test, expect} = require('@playwright/test')


test('First test',async ({browser})=>
{
const context=await browser.newContext();
const page=await context.newPage();
await page.goto("https://todomvc.com/examples/react/#/");
await expect(page).toHaveTitle("React • TodoMVC");

});

test('Enter some tasks',async ({page})=>
{
   await page.goto("https://todomvc.com/examples/react/#/");
   await page.locator(".new-todo").type("wakeup");
   await page.keyboard.press('Enter');
   await page.locator(".new-todo").type("eat");
   await page.keyboard.press('Enter');
   await page.locator(".new-todo").type("sleep");
   await page.keyboard.press('Enter');
  const firstItem= await page.locator(".todo-list label").first().textContent()
  console.log(firstItem)
  expect (firstItem).toContain("wakeup")
  await expect (page.locator(".todo-count")).toContainText("3 items left")
})

test.only("Complete a task", async({page})=>{
const item_name="test1"
const items_List=page.locator(".todo-list li")
await page.goto("https://todomvc.com/examples/react/#/");
await page.locator(".new-todo").type("wakeup");
await page.keyboard.press('Enter');
await page.locator(".new-todo").type(item_name);
await page.keyboard.press('Enter');
await page.locator(".new-todo").type("sleep");
await page.keyboard.press('Enter');
const count=await items_List.count();
for(let i=0;i<count;++i){

 if(await items_List.nth(i).locator("label").textContent()=== item_name)
 {
    await items_List.nth(i).locator(".toggle").click();
    break;
 }
}
await expect (page.locator(".todo-count")).toContainText("2 items left")

})


