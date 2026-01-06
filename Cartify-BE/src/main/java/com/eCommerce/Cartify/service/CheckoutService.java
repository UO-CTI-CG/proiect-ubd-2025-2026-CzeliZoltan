package com.eCommerce.Cartify.service;

import com.eCommerce.Cartify.dto.Purchase;
import com.eCommerce.Cartify.dto.PurchaseResponse;

public interface CheckoutService {


    PurchaseResponse  placeOrder(Purchase purchase);
}
