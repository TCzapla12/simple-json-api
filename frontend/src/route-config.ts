import LandingPage from "./products/LandingPage";
import ProductDetails from "./products/ProductDetails";
import RedirectToLandingPage from "./utils/RedirectToLandingPage";

const routes = [
    {
        path: '/product/:id', component: ProductDetails
    },
    {
        path: '/', component: LandingPage
    },
    {
        path: '*', component: RedirectToLandingPage
    }
]

export default routes