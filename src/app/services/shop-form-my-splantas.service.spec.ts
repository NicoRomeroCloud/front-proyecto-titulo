import { TestBed } from '@angular/core/testing';

import { ShopFormMySPlantasService } from './shop-form-my-splantas.service';

describe('ShopFormMySPlantasService', () => {
  let service: ShopFormMySPlantasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShopFormMySPlantasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
