# eComerce store -  The Water Sport Center
MERN stack e-commerce project. A single page application which allows:
- customers to purchase kite and windsurfing gear,
- sellers and merchants to manage their product offer,
- admins to manage and controll store components

## Demo
This application is deployed on Render https://eshop-54sk.onrender.com

An administrator account login credentials:
**email:** admin@test.com
**password:** Administrator1!

New user always get buyer role (default settings). Change your user role using administrator account.
Please go to Main Feature section to find out more about each role defined actions

## Technology
Project is created with:
**Client:** React, React Redux, Redux Thunk, React Router,  Sass

**Server:** Node, Express, MongoDB, Mongoose, AWS, Stripe

## Main Features
* User cathegories:
    * buyer,
    * employee,
    * administrator


 * Buyer functionality
    A buyer can browse through products and filter using following categories:
    * product type,
    * product brand,
    * price – ascending, descending

    Single product page presents detailed information about product. Product images are displalyed using custm slider (no third party component used).
    Once product is added to cart it can be purchased. Buyer needs to create account and be logged in to proceed to checkout.
    Payments are handled using Stripe. Sample credit card details are provided on the checkout page.
    Order is included on buyer order list once server receives confirmation from Stripe that funds have been sucessfully transffered.

* Employee functinality
Manage products available in eshop, that is:
    * add and edit brand,
    * add and edit sizesystem,
    * add and edit product,

    Employee can only modify entries brand, size system, product that given employee created.
    Brand, size system, product created by other employees can be used as template to create new entry.

* Administrator functionality
Administrator is allowed to perform the same operation as employee and additionally can change given user role.
**Caveat:** For demonstration purposes two super users were introduced. Role of the super users can not be changed. Additionally products, brands, size system of these users can not be edited.

* Product form inputs:
    * availability,
    * brand,
    * category,
    * name,
    * type,
    * description,
    * price,
    * size chart (dynamic input field),
    * image (input with file preview).

* Brand input
    * name,
    * image.

* Size system inputs
    * name,
    * size chart (dynamic input field).

All forms have both forntend and backend validation.

## Install Dependencies (frontend & backend)
Fontend:
cd eshop
npm install

Backend:
cd server
npm install

## Run frontend (:3000) & backend (:5000)
cd eshop
npm run dev