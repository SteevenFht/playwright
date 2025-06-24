import { test, expect, request } from '@playwright/test';
const URL = `https://petstore.swagger.io/v2/pet`
const END_URL_ID = `/${2510}`



test.describe('API tested', {
    tag: '@API',
  }, () => {

  test('post pet', async ({ page }) => {
    const rqst = await request.newContext();
      const response  =await rqst.post(URL,{
      data: {
        id : 2510,
        name: "Jean",
        photoUrls : []
      }
    });
    expect(response.ok()).toBeTruthy();
  });



  test('get pet with id', async ({ page }) => {
    const rqst = await request.newContext();
    const response  =await rqst.get(URL+END_URL_ID);
    expect(response.status()).toBe(200)
    // get the pet in JSON format
    const pet = await response.json();
    const thePet = {
      "id": 2510,
      "name": "Jean",
      "photoUrls": [],
      "tags": [],
    };
    
    expect(JSON.stringify(pet)).toBe(JSON.stringify(thePet))
    
  });

  test('get pet doesn\'t exist', async () => {
    const rqst = await request.newContext();
    const response  =await rqst.get(URL);

    expect(response.status()).toBe(405);
  });

});