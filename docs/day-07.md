# [2025-11-11] Day 7 - Exercise

## Create a full flow / end-to-end test on SauceDemo for the following scenario:

### 1. Login

1. [x] Navigate to login page
2. [x] Enter username/password
3. [x] Click login
4. [x] Verify successful login → redirected to Inventory page

### 2. Browse / Filter Products

1. [x] Optionally sort or filter products (e.g., price low→high)
2. [x] Verify products appear in expected order

### 3. Add Products to Cart

1. [x] Select 1 or more products
2. [x] Click "Add to Cart" button
3. [x] Verify cart badge shows correct number

### 4. View Cart

1. [x] Navigate to cart page
2. [x] Verify selected products are present
3. [x] Optionally remove products and verify cart updates

### 5. Checkout

1. [x] Click "Checkout"
2. [x] Fill in First Name, Last Name, Zip / Postal Code
3. [x] Click Continue

### 6. Review Order

1. [x] Verify items, quantities, and total price
2. [x] Click "Finish"

### 7. Order Confirmation

1. [x] Verify confirmation message: THANK YOU FOR YOUR ORDER
2. [x] Optionally, navigate back to Inventory page

### 8. Logout (optional)

1. [x] Open menu and click logout
2. [x] Verify redirected back to login page

## Apply these items selection using parameter in the Full Flow. Separate each of them to each Test.

- [x] Select items - only Odd in array
- [x] Select items - only Even in array
- [x] Select items - only 1, 2, 3, 4
- [x] Select items - only 3, 4, 5, 6
