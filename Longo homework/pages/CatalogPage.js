import { expect } from '@playwright/test'

export class CatalogPage {
  constructor(page) {
    this.page = page
    this.cards = page.locator('.catalog-page__desktop-grid a.vehicle-card-item')
    this.emptyHeading = page.getByRole('heading', { name: 'Neatrodi savu sapņu mašīnu?' })
    this.resultCount = page.getByText('rezultāti')
    this.latvianTitle = page.getByRole('main').getByText('Lietoti auto', { exact: true })
    this.russianTitle = page.getByText('Продажа авто')
    this.loadingMessage = page.getByText('Lapa atveras...', { exact: true })
  }

  async open() { await this.page.goto('/automasinu-katalogs') }
  async showMakes() {
    await this.page.getByRole('button', { name: /\+\s*\d+\s+auto markas/ }).click()
  }
  async updateResults(action) {
    const [response] = await Promise.all([this.waitForResponse(), action()])
    await response.finished()
    if (!response.ok()) throw new Error(`Catalogue API returned ${response.status()}`)
    // The API completing does not by itself mean the rendered list is ready.
    await expect(this.loadingMessage).toBeHidden()
  }
  async selectMake(make) {
    await this.updateResults(() => this.page.getByRole('checkbox', { name: make }).click())
  }
  async expandFilter(label) {
    await this.page.locator('div').filter({ hasText: label }).first().click()
  }
  async selectBodyType(name) {
    await this.updateResults(() => this.page.getByRole('checkbox', { name }).click())
  }
  filterSelect(label, index) {
    return this.page.locator('section.filter-section').filter({
      has: this.page.locator('.filter-section__head', { hasText: label }),
    }).locator('select').filter({ visible: true }).nth(index)
  }
  async selectMinPrice(value) {
    await this.updateResults(() => this.filterSelect(/^Cena$/, 0).selectOption(String(value)))
    return Number(value)
  }
  async selectMaxPrice(value) {
    await this.updateResults(() => this.filterSelect(/^Cena$/, 1).selectOption(String(value)))
    return Number(value)
  }
  async selectMinYear(value) {
    await this.updateResults(() => this.filterSelect(/^Gads$/, 0).selectOption(String(value)))
  }
  card(index) { return new VehicleCard(this.cards.nth(index)) }
  async openFirstCar() { await this.cards.first().click() }
  async openCarByHref(href) {
    await this.page.locator(`a.vehicle-card-item[href="${href}"]`).first().click()
  }
  waitForResponse() {
    return this.page.waitForResponse(response =>
      new URL(response.url()).pathname === '/api/longo/longo-lv/catalog/find' &&
      response.request().method() === 'POST'
    )
  }
}

export class VehicleCard {
  constructor(root) {
    this.root = root
    this.title = root.locator('.vehicle-card-item__title')
    this.details = root.locator('.vehicle-card-item__detail-chip')
    this.price = root.locator('.vehicle-card-item__price-value--full')
  }
  async model() { return this.title.innerText() }
  async year() { return Number(await this.details.nth(0).innerText()) }
  async mileage() {
    return Number((await this.details.nth(1).innerText()).replace(/\D/g, ''))
  }
  async fullPrice() { return Number((await this.price.innerText()).replace(/\D/g, '')) }
  async href() { return this.root.getAttribute('href') }
}
