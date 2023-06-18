/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/app/app.component.html",
  "./src/app/login/components/login-page/login-page.component.html",
  "./src/app/login/components/login-page/login/login.component.html",
  "./src/app/login/components/login-page/register/register.component.html",
  "./src/app/orders/component/orders-dashboard/dashboard.component.html",
   "./src/app/orders/component/orders-dashboard/order/order.component.html"],
  theme: {
    extend: {},
  },
  plugins: [],
}

