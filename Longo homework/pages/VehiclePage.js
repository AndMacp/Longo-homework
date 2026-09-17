export class VehiclePage {
  constructor(page) {
    this.heading = page.locator('.desktop-vehicle-header__title')
    this.price = page.locator('.desktop-vehicle-header__container')
      .locator('.desktop-vehicle-header-price__price-row').filter({ visible: true })
    this.mileage = page.locator('#vehicle-details-anchor').getByText(/^\s*[\d\s]+km\s*$/)
    this.latvianCalculator = page.getByRole('heading', { name: 'Finanšu kalkulators' })
    this.russianCalculator = page.getByRole('heading', { name: 'Финансовый калькулятор' })
  }
  async fullPrice() { return Number((await this.price.innerText()).replace(/\D/g, '')) }
  async mileageValue() { return Number((await this.mileage.innerText()).replace(/\D/g, '')) }
}
