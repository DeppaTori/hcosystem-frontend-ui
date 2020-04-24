import React from 'react';
import { Switch, Redirect } from 'react-router-dom';

import { RouteWithLayout,PrivateRouteWithLayout } from './components';
import { Main as MainLayout, Minimal as MinimalLayout } from './layouts';

import {
  Dashboard as DashboardView,
  ProductList as ProductListView,
  UserList as UserListView,
  Typography as TypographyView,
  Icons as IconsView,
  Account as AccountView,
  Settings as SettingsView,
  SignUp as SignUpView,
  SignIn as SignInView,
  NotFound as NotFoundView,
  PemesananMobil as PemesananMobilView,
  PemesananMobilForm as PemesananMobilFormView,
  PemesananMobilSearch as PemesananMobilSearchView,
  ReservasiMeeting as ReservasiMeetingView,
  ReservasiMeetingForm as ReservasiMeetingFormView,
  ReservasiMeetingSearch as ReservasiMeetingSearchView,
  RuangMeeting as RuangMeetingView,
  RuangMeetingForm as RuangMeetingFormView,
  OrderInventory as OrderInventoryView,
  OrderInventoryForm as OrderInventoryFormView,
  OrderInventorySearch as OrderInventorySearchView,
  OrderInventoryApproveForm as OrderInventoryApproveFormView,
  StockInventory as StockInventoryView,
  StockInventoryForm as StockInventoryFormView,
  Catering as CateringView,
  CateringForm as CateringFormView,
  User as UserView,
  UserForm as UserFormView,
  LaporanSummary as LaporanSummaryView,
  Laporan as LaporanView,
  LaporanInventaris as LaporanInventarisView,
  Mobil as MobilView,
  MobilForm as MobilFormView,
  LaporanDashboard as LaporanDashboardView,
  LaporanDetRgMeeting as LaporanDetRgMeetingView,
  LaporanDetCatering as LaporanDetCateringView,
  LaporanDetMobil as LaporanDetMobilView,
} from './views';

import PrivateRoute from './auth/PrivateRoute';

const Routes = () => {
  return (
    <Switch>
      <Redirect
        exact
        from="/"
        to="/dashboard"
      />
      <PrivateRouteWithLayout
        component={DashboardView}
        exact
        layout={MainLayout}
        path="/dashboard"
      />
      <PrivateRouteWithLayout
        component={IconsView}
        exact
        layout={MainLayout}
        path="/inventory"
      />
      <PrivateRouteWithLayout
        component={ProductListView}
        exact
        layout={MainLayout}
        path="/tidak-dipakai-plv"
      />
      <PrivateRouteWithLayout
        component={RuangMeetingView}
        exact
        layout={MainLayout}
        path="/ruang-meeting"
      />
       <PrivateRouteWithLayout
        component={RuangMeetingFormView}
        exact
        layout={MainLayout}
        path="/ruang-meeting/tambah"
      />

      <PrivateRouteWithLayout
        component={RuangMeetingFormView}
        exact
        layout={MainLayout}
        path="/ruang-meeting/view"
      />

       <PrivateRouteWithLayout
        component={ReservasiMeetingFormView}
        exact
        layout={MainLayout}
        path="/reservasi-ruang-meeting/view"
      />
 
 <PrivateRouteWithLayout
        component={ReservasiMeetingView}
        exact
        layout={MainLayout}
        path="/reservasi-ruang-meeting"
      />
       <PrivateRouteWithLayout
        component={ReservasiMeetingFormView}
        exact
        layout={MainLayout}
        path="/reservasi-ruang-meeting/tambah"
      />
     

      <PrivateRouteWithLayout
        component={ReservasiMeetingSearchView}
        exact
        layout={MainLayout}
        path="/reservasi-ruang-meeting/search"
      />

<PrivateRouteWithLayout
        component={OrderInventoryFormView}
        exact
        layout={MainLayout}
        path="/order-inventory/view"
      />
 
 <PrivateRouteWithLayout
        component={OrderInventoryView}
        exact
        layout={MainLayout}
        path="/order-inventory"
      />
       <PrivateRouteWithLayout
        component={OrderInventoryFormView}
        exact
        layout={MainLayout}
        path="/order-inventory/tambah"
      />

<PrivateRouteWithLayout
        component={OrderInventorySearchView}
        exact
        layout={MainLayout}
        path="/order-inventory/search"
      />

<PrivateRouteWithLayout
        component={OrderInventoryApproveFormView}
        exact
        layout={MainLayout}
        path="/order-inventory/approve"
      />
     

     
      <PrivateRouteWithLayout
        component={PemesananMobilView}
        exact
        layout={MainLayout}
        path="/pemesanan-mobil"
      />
       <PrivateRouteWithLayout
        component={PemesananMobilFormView}
        exact
        layout={MainLayout}
        path="/pemesanan-mobil/tambah"
      />

<PrivateRouteWithLayout
        component={PemesananMobilFormView}
        exact
        layout={MainLayout}
        path="/pemesanan-mobil/view"
      />

<PrivateRouteWithLayout
        component={PemesananMobilSearchView}
        exact
        layout={MainLayout}
        path="/pemesanan-mobil/search"
      />

<PrivateRouteWithLayout
        component={MobilView}
        exact
        layout={MainLayout}
        path="/mobil"
      />
       <PrivateRouteWithLayout
        component={MobilFormView}
        exact
        layout={MainLayout}
        path="/mobil/tambah"
      />

<PrivateRouteWithLayout
        component={MobilFormView}
        exact
        layout={MainLayout}
        path="/mobil/view"
      />

      <PrivateRouteWithLayout
        component={StockInventoryView}
        exact
        layout={MainLayout}
        path="/stock-inventory"
      />
       <PrivateRouteWithLayout
        component={StockInventoryFormView}
        exact
        layout={MainLayout}
        path="/stock-inventory/tambah"
      />
        <PrivateRouteWithLayout
        component={StockInventoryFormView}
        exact
        layout={MainLayout}
        path="/stock-inventory/view"
      />

<PrivateRouteWithLayout
        component={CateringView}
        exact
        layout={MainLayout}
        path="/catering"
      />
       <PrivateRouteWithLayout
        component={CateringFormView}
        exact
        layout={MainLayout}
        path="/catering/tambah"
      />
      <PrivateRouteWithLayout
        component={CateringFormView}
        exact
        layout={MainLayout}
        path="/catering/view"
      />

<PrivateRouteWithLayout
        component={UserView}
        exact
        layout={MainLayout}
        path="/user"
      />
       <PrivateRouteWithLayout
        component={UserFormView}
        exact
        layout={MainLayout}
        path="/user/tambah"
      />

<PrivateRouteWithLayout
        component={UserFormView}
        exact
        layout={MainLayout}
        path="/user/view"
      />

<PrivateRouteWithLayout
        component={LaporanSummaryView}
        exact
        layout={MainLayout}
        path="/laporan-summary"
      />

      {/* <PrivateRouteWithLayout
        component={LaporanView}
        exact
        layout={MainLayout}
        path="/laporan"
      /> */}

        <PrivateRouteWithLayout
        component={LaporanView}
        exact
        layout={MainLayout}
        path="/laporan-detail/inventaris"
      />

<PrivateRouteWithLayout
        component={LaporanDetRgMeetingView}
        exact
        layout={MainLayout}
        path="/laporan-detail/ruang-meeting"
      />

<PrivateRouteWithLayout
        component={LaporanDetCateringView}
        exact
        layout={MainLayout}
        path="/laporan-detail/catering"
      />

<PrivateRouteWithLayout
        component={LaporanDetMobilView}
        exact
        layout={MainLayout}
        path="/laporan-detail/mobil"
      />

<PrivateRouteWithLayout
        component={LaporanDashboardView}
        exact
        layout={MainLayout}
        path="/laporan"
      />

       <PrivateRouteWithLayout
        component={LaporanInventarisView}
        exact
        layout={MainLayout}
        path="/laporan/inventaris"
      />

<PrivateRouteWithLayout
        component={LaporanView}
        exact
        layout={MainLayout}
        path="/laporan/ruang-meeting"
      />

<PrivateRouteWithLayout
        component={LaporanView}
        exact
        layout={MainLayout}
        path="/laporan/catering"
      />

<PrivateRouteWithLayout
        component={LaporanView}
        exact
        layout={MainLayout}
        path="/laporan/pemesanan-mobil"
      />


      <RouteWithLayout
        component={SettingsView}
        exact
        layout={MainLayout}
        path="/settings"
      />
      <RouteWithLayout
        component={SignUpView}
        exact
        layout={MinimalLayout}
        path="/sign-up"
      />
      <RouteWithLayout
        component={SignInView}
        exact
        layout={MinimalLayout}
        path="/sign-in"
      />
       <RouteWithLayout
        component={AccountView}
        exact
        layout={MainLayout}
        path="/contoh-form"
      />
      <RouteWithLayout
        component={NotFoundView}
        exact
        layout={MinimalLayout}
        path="/not-found"
      />
    
      <Redirect to="/not-found" />
    </Switch>
  );
};

export default Routes;
