import { test, expect } from '@playwright/test';
import { CatalogPage } from './pages/CatalogPage';
import { VehiclePage } from './pages/VehiclePage';
import { SiteNavigation } from './pages/SiteNavigation';

test('Catalog filtering', async ({ page }) => {
  const carMake = 'Citroen'

  const catalog = new CatalogPage(page)
  const navigation = new SiteNavigation(page)
  const vehicle = new VehiclePage(page)
  await catalog.open()
  await navigation.acceptCookies()
  await expect(page).toHaveURL('/automasinu-katalogs')

  await catalog.showMakes()

  await catalog.selectMake(carMake)

  await expect(page).toHaveURL('/automasinu-katalogs?makes=CITROEN')

  await catalog.expandFilter(/^Virsbūves tips$/)
  await catalog.selectBodyType('Minivens')
  await expect(page).toHaveURL('/automasinu-katalogs?makes=CITROEN&bodyTypes=Minivan')

  await catalog.expandFilter(/^Cena$/)

  const minPrice = await catalog.selectMinPrice('5000')
  await expect(page).toHaveURL('/automasinu-katalogs?makes=CITROEN&bodyTypes=Minivan&priceFrom=5000')
  const maxPrice = await catalog.selectMaxPrice('7000')
  await expect(page).toHaveURL('/automasinu-katalogs?makes=CITROEN&bodyTypes=Minivan&priceFrom=5000&priceTo=7000')

  
const cards = catalog.cards

await expect(cards.first()).toBeVisible()
const count = await cards.count()
expect(count).toBeGreaterThan(0)

for (let i = 0; i < count; i++) {
const card = catalog.card(i)
const title = await card.model()
const price = await card.fullPrice()
expect(title).toContain(carMake)
expect(price).toBeGreaterThanOrEqual(Number(minPrice))
expect(price).toBeLessThanOrEqual(Number(maxPrice))
}

const firstCar = catalog.card(0)
const firstCarModel = await firstCar.model()
const firstCarYear = await firstCar.year()
const firstCarMileage = await firstCar.mileage()
const firstCarPrice = await firstCar.fullPrice()
const firstCarHref = await firstCar.href()
expect(firstCarHref).toBeTruthy()
await catalog.openCarByHref(firstCarHref)

const productPagePrice = await vehicle.fullPrice()
const productPageMileage = await vehicle.mileageValue()
const productPageHeading = vehicle.heading

await expect(productPageHeading).toContainText(String(firstCarYear))
await expect(productPageHeading).toContainText(firstCarModel)
expect(productPageMileage).toBe(firstCarMileage)
expect(productPagePrice).toBe(firstCarPrice)
});


test('Language switching', async({page})=>
{
  //LV default
  const catalog = new CatalogPage(page)
  const navigation = new SiteNavigation(page)
  const vehicle = new VehiclePage(page)
  await catalog.open()
  await navigation.acceptCookies()

  await expect(page).toHaveURL('/automasinu-katalogs')
  await expect(catalog.latvianTitle).toBeVisible()

  await catalog.openFirstCar()

  await expect(vehicle.latvianCalculator).toBeVisible()
  
  await navigation.openLatvianCatalog()

  //EN

  await navigation.switchLanguage('en')

  await expect(page).toHaveURL(/\/en\/catalog(?:[?#]|$)/)
  await expect(navigation.englishText).toBeVisible()

  await catalog.openFirstCar()

  await expect(page).toHaveURL(/\/en\//)
  await expect(navigation.englishText).toBeVisible()

  await navigation.openEnglishCatalog()
  
  //RU
  await navigation.switchLanguage('ru')
 
  await expect(page).toHaveURL(/\/ru\/katalog-avtomobiley(?:[?#]|$)/)
  await expect(catalog.russianTitle).toBeVisible()
  

  await catalog.openFirstCar()

  await expect(page).toHaveURL(/\/ru\//)
  await expect(vehicle.russianCalculator).toBeVisible()

})

test('Negative / empty state', async({page})=>
{
   const carMake = 'Citroen'

  const catalog = new CatalogPage(page)
  const navigation = new SiteNavigation(page)
  const vehicle = new VehiclePage(page)
  await catalog.open()
  await navigation.acceptCookies()
  await expect(page).toHaveURL('/automasinu-katalogs')

  await catalog.showMakes()

  await catalog.selectMake(carMake)

  await expect(page).toHaveURL('/automasinu-katalogs?makes=CITROEN')

  await catalog.expandFilter(/^Virsbūves tips$/)
  await catalog.selectBodyType('Minivens')
  await expect(page).toHaveURL('/automasinu-katalogs?makes=CITROEN&bodyTypes=Minivan')

  await catalog.expandFilter(/^Cena$/)

  await catalog.selectMinPrice('5000')
  await expect(page).toHaveURL('/automasinu-katalogs?makes=CITROEN&bodyTypes=Minivan&priceFrom=5000')
  await catalog.selectMaxPrice('7000')
  await expect(page).toHaveURL('/automasinu-katalogs?makes=CITROEN&bodyTypes=Minivan&priceFrom=5000&priceTo=7000')

  await catalog.expandFilter(/^Gads$/)
  await catalog.selectMinYear('2025')
  await expect(page).toHaveURL('/automasinu-katalogs?makes=CITROEN&bodyTypes=Minivan&priceFrom=5000&priceTo=7000&yearFrom=2025')

  const cards = catalog.cards
  
  await expect(cards).toHaveCount(0)
  await expect(catalog.emptyHeading).toBeVisible()
  await expect(catalog.resultCount).toHaveText('0 rezultāti')
})
 
test('Required non-UI scenario', async ({ page }) =>
{
  const catalog = new CatalogPage(page)
  const navigation = new SiteNavigation(page)
  const vehicle = new VehiclePage(page)
  await catalog.open()
  await navigation.acceptCookies()
  await catalog.showMakes()

const responsePromise = catalog.waitForResponse()

await catalog.selectMake('Citroen')

const response = await responsePromise
expect(response.status(), 'Catalogue API should return HTTP 200').toBe(200)
expect(response.headers()['content-type'], 'Catalogue API should return JSON')
  .toContain('application/json')

const body = await response.json()
expect(body, 'Catalogue API should return a JSON object or array').not.toBeNull()
expect(typeof body).toBe('object')
expect(Object.keys(body).length, 'Catalogue response should not be empty')
  .toBeGreaterThan(0)

console.log('Catalogue request payload:', response.request().postDataJSON())
console.log(body)
})
