package com.eCommerce.Cartify.dto;

import com.eCommerce.Cartify.entity.Address;
import com.eCommerce.Cartify.entity.Customer;
import com.eCommerce.Cartify.entity.Order;
import com.eCommerce.Cartify.entity.OrderItem;
import lombok.Data;

import java.util.Set;

@Data
public class Purchase {

    private Customer customer;

    private Address shippingAddress;

    private Address billingAddress;

    private Order order;

    private Set<OrderItem> orderItems;
}
