<template>
  <div>
    <div class="header">
      Tahapan Pilih Produk Pinjaman
      <div>
        <small>pilih produk pinjaman yang sesuai dengan kebutuhan Anda</small>
      </div>
    </div>

    <v-layout
      row
      wrap
      style="margin-bottom: 20px; background-color: #EEEEEE;padding-left:10px;padding-right:10px;padding-bottom:10px;"
    >
      <!-- SKOR -->
      <v-flex xs12 sm8 md6 offset-xs0 offset-sm2 offset-md3>
        <v-layout wrap>
          <v-flex xs12>
            <div style="font-size: 14px; padding-top: 20px; padding-bottom: 20px;">Skor JULO Anda</div>
          </v-flex>
          <v-flex xs4 class="relative">
            <lottie :options="lottieOptions" :height="110" :width="110" style="margin:0px;" />
            <div id="circle" :class="[circleColor]">{{scoreUser.score}}</div>
          </v-flex>
          <v-flex xs8 style="padding-left:10px;">{{scoreUser.message}}</v-flex>
        </v-layout>
      </v-flex>
      <!-- SKOR -->
    </v-layout>
    <div class="center" style="margin-left:10px;">
      <v-layout row wrap style="margin-bottom: 30px;">
        <!-- pinjaman tunai -->
        <v-flex xs12 sm8 md6 offset-xs0 offset-sm2 offset-md3>
          <div class="divBlock">Pinjaman Tunai</div>

          <v-layout wrap>
            <!-- v-bind="{ [`xs${cashLoans.length == 1 ? '12' : '6'}`]: true }" -->
            <v-flex
              xs6
              class="smallPadding"
              v-for="(cashLoan,i) in cashLoans"
              :key="i"
              v-if="cashLoan.show"
              @click="chooseProduct(cashLoan)"
            >
              <v-card>
                <div style="width:100%;" :class="cashLoan.class">
                  <img :src="cashLoan.headerImg" style="width:100%; margin-top:10px;" />
                </div>

                <v-card-title primary-title style="padding-top:3px;padding-bottom:10px;">
                  <div>
                    <h3 class="headline mb-0">
                      <strong>{{cashLoan.title}}</strong>
                    </h3>
                    <div style="color:grey; height: 35px;">{{cashLoan.text}}</div>
                  </div>
                </v-card-title>

                <v-card-actions>
                  <j-btn block dark :class="cashLoan.class" @click="chooseProduct(cashLoan)">Pilih</j-btn>
                </v-card-actions>
              </v-card>
            </v-flex>
          </v-layout>
        </v-flex>
        <!-- pinjaman tunai -->
        <!-- <v-flex xs12 sm8 md6 offset-xs0 offset-sm2 offset-md3>
          <div class="buttonNext">
            <v-divider></v-divider>
          </div>
        </v-flex>-->
        <!-- pinjaman non tunai -->
        <!-- <v-flex xs12 sm8 md6 offset-xs0 offset-sm2 offset-md3>
          <div class="divBlock">Pinjaman NON Tunai</div>
          <v-layout wrap>
            <v-flex xs12 class="smallPadding">
              <v-card style="color: white;" :class="kredit.class">
                <div
                  style="width:100%; height: 70px; padding-top: 20px; padding-left:10px; padding-right:10px;"
                >
                  <v-layout row>
                    <v-flex xs5>
                      <h3 class="headline mb-0">
                        <strong>JULO Pulsa</strong>
                      </h3>
                    </v-flex>
                    <v-flex xs2>
                      <div style="text-align:center; padding-left:10px;">
                        <div class="verticalLine" style="height: 60px;"></div>
                      </div>
                    </v-flex>
                    <v-flex xs5>
                      <div>Status</div>
                      <h3 class="headline mb-0">
                        <strong>Non Aktif</strong>
                      </h3>
                    </v-flex>
                  </v-layout>
                </div>

                <v-card-title primary-title style="width:100%; height: 150px;">
                  <v-layout row>
                    <v-flex xs6>
                      <div>Batas Kredit:</div>
                      <h3 class="headline mb-0">
                        <strong>Rp. 300.000</strong>
                      </h3>
                    </v-flex>
                    <v-flex xs6>
                      <div>Untuk Membeli:</div>
                      <v-layout row>
                        <v-flex xs4>
                          <v-layout column>
                            <v-flex>
                              <v-icon medium dark>phone_android</v-icon>
                            </v-flex>
                            <v-flex>Pulsa</v-flex>
                          </v-layout>
                        </v-flex>
                        <v-flex xs4>
                          <v-layout column>
                            <v-flex>
                              <v-icon medium dark>wifi</v-icon>
                            </v-flex>
                            <v-flex>Data</v-flex>
                          </v-layout>
                        </v-flex>
                        <v-flex xs4>
                          <v-layout column>
                            <v-flex>
                              <v-icon medium dark>offline_bolt</v-icon>
                            </v-flex>
                            <v-flex>PLN</v-flex>
                          </v-layout>
                        </v-flex>
                      </v-layout>
                    </v-flex>
                  </v-layout>
                </v-card-title>
                <v-card-actions>
                  <j-btn block>
                    <span class="primaryColor" @click="chooseProduct(kredit)">Rincian & Aktivasi</span>
                  </j-btn>
                </v-card-actions>
              </v-card>
            </v-flex>
          </v-layout>
        </v-flex>-->
        <!-- pinjaman non tunai -->
      </v-layout>

      <!--productDialog-->
      <v-layout row justify-center>
        <v-flex xs12 sm8 md6 offset-xs0 offset-sm2 offset-md3>
          <v-dialog v-model="productDialog" persistent width="450">
            <v-card>
              <v-card-title :class="choosedCashLoan.class" style="color:white; padding-top:5px;">
                <div style="width:100%; text-align: right;">
                  <j-btn
                    icon
                    @click.native="productDialog = false"
                    style="color:white; float:right; margin:0px;"
                  >
                    <v-icon>close</v-icon>
                  </j-btn>
                </div>
                <div
                  style="text-align: center; font-weight: bold; font-size: 18px; width: 100%; margin-bottom: 30px;"
                >{{choosedCashLoan.title}}</div>

                <div
                  v-if="choosedCashLoan.title == 'Julo Mini'"
                  style="text-align:center; width:100%; margin-bottom:20px;"
                >
                  Detil Pinjaman untuk Skor JULO
                  <div style="font-weight: bold; font-size: 16px;">{{scoreUser.score}}</div>
                </div>

                <div
                  v-if="choosedCashLoan.details.loanAmountStart"
                  style="margin-bottom: 20px; width:100%"
                >
                  <v-layout
                    wrap
                    v-if="choosedCashLoan.details.loanAmountStart != choosedCashLoan.details.loanAmountEnd"
                  >
                    <v-flex xs6>Jumlah Pinjaman</v-flex>
                    <v-flex xs6 style="font-weight: bold; font-size: 16px; text-align: right;">
                      <span>{{productSelection.loanAmount * 100000 | currency('Rp. ', 0)}}</span>
                    </v-flex>
                    <v-flex xs12>
                      <v-slider
                        track-color="grey"
                        v-model="productSelection.loanAmount"
                        color="white"
                        :max="choosedCashLoan.details.loanAmountEnd"
                        :min="choosedCashLoan.details.loanAmountStart"
                        step="5"
                        style="padding-bottom:0px; margin-bottom:0px;"
                      ></v-slider>
                    </v-flex>
                    <!--
                    style="transform:translateY(-15px);"-->
                    <v-flex
                      xs6
                    >{{choosedCashLoan.details.loanAmountStart * 100000 | currency('Rp. ', 0)}}</v-flex>
                    <v-flex
                      xs6
                      style="text-align: right;"
                    >{{choosedCashLoan.details.loanAmountEnd * 100000 | currency('Rp. ', 0)}}</v-flex>
                  </v-layout>

                  <v-layout wrap v-else>
                    <v-flex xs3>
                      <img src="@/assets/ic_money_mini.png" style="width: 60%" />
                    </v-flex>
                    <v-flex xs9>
                      <v-layout column>
                        <v-flex>Pinjaman</v-flex>
                        <v-flex
                          style="font-weight: bold; font-size: 16px;"
                        >{{productSelection.loanAmount * 100000 | currency('Rp. ', 0)}}</v-flex>
                      </v-layout>
                    </v-flex>
                  </v-layout>
                </div>

                <div v-if="choosedCashLoan.details.loanDurationStart" style="width:100%">
                  <v-layout
                    wrap
                    v-if="choosedCashLoan.details.loanDurationStart != choosedCashLoan.details.loanDurationEnd"
                  >
                    <v-flex xs6>Jangka Waktu</v-flex>
                    <v-flex xs6 style="font-weight: bold; font-size: 16px; text-align: right;">
                      <span>{{productSelection.loanDuration}} bulan</span>
                    </v-flex>
                    <v-flex xs12>
                      <v-slider
                        track-color="grey"
                        v-model="productSelection.loanDuration"
                        color="white"
                        :tick-labels="[3,4,5,6]"
                        :max="choosedCashLoan.details.loanDurationEnd"
                        :min="choosedCashLoan.details.loanDurationStart"
                        step="1"
                        ticks="always"
                        tick-size="1"
                      ></v-slider>
                    </v-flex>
                  </v-layout>

                  <v-layout wrap v-else>
                    <v-flex xs3>
                      <!-- style="height:35px; filter: brightness(0) invert(1);" -->
                      <img src="@/assets/product_icon_mini.png" style="width:100%" />
                    </v-flex>
                    <v-flex xs9>
                      <v-layout column>
                        <v-flex>Jangka Waktu</v-flex>
                        <v-flex
                          style="font-weight: bold; font-size: 16px;"
                        >{{productSelection.loanDuration}} bulan</v-flex>
                      </v-layout>
                    </v-flex>
                  </v-layout>
                </div>

                <div v-if="choosedCashLoan.details.loanDurationType" style="width: 100%">
                  Pilihlah jaminan Anda
                  <v-layout style="width:100%">
                    <v-flex v-for="(type, i) in choosedCashLoan.details.loanDurationType" :key="i">
                      <j-btn
                        :class="type.class"
                        @click="showDetail(i)"
                        style="min-width:0px; width:75px;"
                      >{{type.label}}</j-btn>
                    </v-flex>
                  </v-layout>
                </div>
              </v-card-title>
              <v-card-text v-show="showProductDialogText">
                <div v-if="choosedCashLoan.title == 'Julo Agunan'" style="width:100%">
                  <form data-vv-scope="juloAgunanForm">
                    <div v-if="productSelection.category == 'vehicle'">
                      <label class="labelInput">Model Kendaraan</label>
                      <j-select
                        :items="productSelection.key == 'car' ? typeCar : typeMotor"
                        item-text="name"
                        item-value="name"
                        placeholder="Model Kendaraan"
                        v-model="productSelection.model"
                        outline
                        v-validate="'required'"
                        :error-messages="errors.collect('Model Kendaraan')"
                        data-vv-name="Model Kendaraan"
                        required
                      ></j-select>
                      <div class="errorInput">
                        <span>{{ errors.first(`juloAgunanForm${'Model Kendaraan'}`) }}</span>
                      </div>

                      <label class="labelInput">Tahun Pembuatan</label>
                      <j-select
                        :items="yearVehicle"
                        placeholder="Tahun Pembuatan"
                        v-model="productSelection.year"
                        outline
                        v-validate="'required'"
                        :error-messages="errors.collect('Tahun Pembuatan')"
                        data-vv-name="Tahun Pembuatan"
                        required
                      ></j-select>
                      <div class="errorInput">
                        <span>{{ errors.first(`juloAgunanForm${'Tahun Pembuatan'}`) }}</span>
                      </div>
                    </div>
                    <div v-if="productSelection.category == 'document'">
                      <label class="labelInput">Jenis Sertifikat</label>
                      <j-select
                        :items="['Rumah','Ruko','Apartemen']"
                        placeholder="Jenis Sertifikat"
                        v-model="productSelection.model"
                        outline
                        v-validate="'required'"
                        :error-messages="errors.collect('Jenis Sertifikat')"
                        data-vv-name="Jenis Sertifikat"
                        required
                      ></j-select>
                      <div class="errorInput">
                        <span>{{ errors.first(`juloAgunanForm${'Jenis Sertifikat'}`) }}</span>
                      </div>
                    </div>
                  </form>
                </div>
                <div v-if="choosedCashLoan.title =='Julo Kredit'">
                  Julo Pulsa hanya dapat digunakan
                  <v-layout wrap style="margin-top:10px;">
                    <v-flex xs2>
                      <v-icon medium color="#00ACF0">phone_android</v-icon>
                    </v-flex>
                    <v-flex xs10>Membeli Pulsa</v-flex>
                    <v-flex xs2>
                      <v-icon medium color="#1F88D1">wifi</v-icon>
                    </v-flex>
                    <v-flex xs10>Membeli Paket Data</v-flex>
                    <v-flex xs2>
                      <v-icon medium color="#3E63B1">offline_bolt</v-icon>
                    </v-flex>
                    <v-flex xs10>Membeli Token Listrik PLN</v-flex>
                  </v-layout>

                  <div class="buttonNext">
                    <v-divider></v-divider>
                  </div>

                  <div>
                    Siklus penggunaan tiap bulan:
                    <div class="divKredit">
                      <v-card>
                        <img src="../assets/il_julopulsa.svg" />
                      </v-card>
                      <v-expansion-panel>
                        <v-expansion-panel-content>
                          <div slot="header" class="primaryColor">Lihat Contoh</div>
                          <v-card>
                            <v-card-text>
                              Anda membeli pulsa Rp.50.000, maka sisa kredit Anda adalah Rp.250.000
                              (Rp. 300.000 - Rp. 50.000). Tagihan bulanan anda Rp. 50.000.
                              Sisa kredit dapat kembali Rp. 300.000 jika Anda bayar penuh tagihan Anda
                            </v-card-text>
                          </v-card>
                        </v-expansion-panel-content>
                      </v-expansion-panel>
                    </div>
                    <span style="color:red;">*</span>Bayar penuh tagihan Anda agar tidak terkena bunga pinjamanpada tagihan berikutnya
                  </div>
                </div>
                <div
                  v-else-if="choosedCashLoan.title =='Julo Mini' || choosedCashLoan.title =='Julo Cicil'"
                >
                  <div>Rincian Pinjaman</div>
                  <div class="borderDiv">
                    <v-layout wrap>
                      <v-flex
                        xs6
                        style="border-right: 2px solid #d3d3d3; padding-left:5px;"
                      >Jumlah Pinjaman</v-flex>
                      <v-flex
                        xs6
                        style="padding-left:10px;"
                      >{{productSelection.loanAmount * 100000 | currency('Rp. ', 0)}}</v-flex>
                      <v-flex
                        xs6
                        style="border-right: 2px solid #d3d3d3; padding-left:5px;"
                      >Jangka Waktu</v-flex>
                      <v-flex xs6 style="padding-left:10px;">{{productSelection.loanDuration}} bulan</v-flex>
                      <v-flex
                        xs6
                        style="border-right: 2px solid #d3d3d3; padding-left:5px;"
                        v-if="choosedCashLoan.details.monthlyInterest"
                      >Bunga per Bulan</v-flex>
                      <v-flex
                        xs6
                        style="padding-left:10px;"
                        v-if="choosedCashLoan.details.monthlyInterest"
                      >{{choosedCashLoan.details.monthlyInterest*100}}%</v-flex>
                      <v-flex
                        xs6
                        style="border-right: 2px solid #d3d3d3; padding-left:5px;"
                        v-if="choosedCashLoan.details.monthlyInterest"
                      >Cicilan per Bulan</v-flex>
                      <v-flex
                        xs6
                        style="padding-left:10px;"
                        v-if="choosedCashLoan.details.monthlyInterest"
                      >{{(100 + (choosedCashLoan.details.monthlyInterest* 100 * productSelection.loanDuration)) * productSelection.loanAmount /productSelection.loanDuration * 1000 | currency('Rp. ', 0)}}</v-flex>
                      <v-flex
                        xs6
                        style="border-right: 2px solid #d3d3d3; padding-left:5px;"
                        v-if="choosedCashLoan.details.cashback"
                      >Cashback</v-flex>
                      <v-flex
                        xs6
                        style="padding-left:10px;"
                        v-if="choosedCashLoan.details.cashback"
                      >{{productSelection.loanAmount * 1000 * choosedCashLoan.details.cashback | currency('Rp. ', 0)}}</v-flex>
                      <v-flex
                        xs6
                        style="border-right: 2px solid #d3d3d3; padding-left:5px;"
                        v-if="choosedCashLoan.details.paybackAmount"
                      >Jumlah Pengembalian</v-flex>
                      <v-flex
                        xs6
                        style="padding-left:10px;"
                        v-if="choosedCashLoan.details.paybackAmount"
                      >{{choosedCashLoan.details.paybackAmount * 100000 | currency('Rp. ', 0)}}</v-flex>
                    </v-layout>
                  </div>
                </div>
                <div class="buttonNext">
                  <v-divider></v-divider>
                </div>
                <div style="width:100%; text-align:center;">
                  <j-btn dark :class="choosedCashLoan.class" @click="confirmProductShow">Ajukan</j-btn>
                </div>
              </v-card-text>
            </v-card>
          </v-dialog>
        </v-flex>
      </v-layout>
      <!--productDialog-->
      <!--confirm loan-->
      <v-layout row justify-center>
        <v-flex xs12 sm8 md6 offset-xs0 offset-sm2 offset-md3>
          <v-dialog v-model="confirmLoanDialog" persistent width="450">
            <v-card>
              <v-card-actions class="grey lighten-4">
                <v-spacer></v-spacer>
                <j-btn icon @click.native="confirmLoanDialog = false" style="color:grey;">
                  <v-icon>close</v-icon>
                </j-btn>
              </v-card-actions>
              <v-card-title class="grey lighten-4">
                <div
                  class="buttonNext primaryColor"
                  style="text-align: center; font-weight: bold; font-size: 18px; width: 100%"
                >Ajukan Pinjaman</div>
                <div style="font-size: 14px; text-align: center;">
                  Apakah Anda yakin untuk mengajukan pinjaman
                  <strong>{{choosedCashLoan.title}}</strong>
                </div>
              </v-card-title>
              <v-card-text style="padding-top:30px;">
                <j-btn block class="color8" dark @click="ajukanPinjaman">Ya</j-btn>
                <j-btn block @click="confirmLoanDialog = false">Tidak</j-btn>
              </v-card-text>
            </v-card>
          </v-dialog>
        </v-flex>
      </v-layout>
      <!--confirm loan-->

      <!-- instant expires -->
      <v-layout row justify-center>
        <v-flex xs12 sm9 md6 offset-xs0 offset-sm2 offset-md3>
          <v-dialog v-model="instantExpirePopUp" persistent width="350">
            <v-card>
              <v-card-title>
                <img src="../assets/instant_expiration.png" style="margin:auto; width:100%;" />
                <div
                  class="primaryColor"
                  style="text-align: center; font-size: 14px; width: 100%;"
                >Anda Masih Memiliki Kesempatan !</div>
              </v-card-title>
              <v-card-text>
                <div style="padding-bottom:0px; margin-left: 5px; margin-right: 5px; ">
                  <p style="text-align: center; font-size: 11.5px;">
                    Anda Masih Berkesempatan untuk Mendapatkan Pinjaman s/d 8 Juta Rupiah !
                    <br />Ajukan pinjaman anda melalui aplikasi JULO. Download Aplikasi JULO sekarang juga !
                  </p>
                </div>
              </v-card-text>
              <v-card-actions>
                <v-layout>
                  <v-flex xs6>
                    <j-btn depressed large block @click="instantExpirePopUp = false">Kembali</j-btn>
                  </v-flex>
                  <v-flex xs6>
                    <j-btn
                      depressed
                      large
                      block
                      class="color8"
                      dark
                      @click="doInstantExpire"
                    >Lanjutkan</j-btn>
                  </v-flex>
                </v-layout>
                <!-- <v-spacer></v-spacer> -->
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-flex>
      </v-layout>
      <!-- instant expires -->
    </div>
  </div>
</template>

<script>
import { mapActions, mapState, mapMutations } from "vuex";
import Lottie from "vue-lottie";
import moment from "moment";
import enums from "../enums";
import statusCodeMappingRoute from "../helper/statusCode";

const thisYear = moment().format("YYYY");
const { types } = enums;

const rangeDefault = {
  loanDuration: 4,
  loanAmount: 50
};

export default {
  components: { Lottie },
  data() {
    return {
      instantExpirePopUp: false,
      circleColor: "",
      showProductDialogText: true,
      yearVehicle: _.range(2000, thisYear),
      productDialog: false,
      confirmLoanDialog: false,
      productSelection: rangeDefault,
      clonedproductSelection: {},
      lottieOptions: {},
      scoreUser: {
        score: "a",
        text: "yeahhh yeahhhh yeahhh yeahhhh yeahhh yeahhhh"
      },
      typeCar: [
        { name: "Daihatsu" },
        { name: "Datsun" },
        { name: "Ford" },
        { name: "Honda" },
        { name: "Hyundai" },
        { name: "Isuzu" },
        { name: "Kia" },
        { name: "Mazda" },
        { name: "Mercedes" },
        { name: "Mitsubishi" },
        { name: "Nissan" }
      ],
      typeMotor: [
        { name: "Honda" },
        { name: "Yamaha" },
        { name: "Kawasaki" },
        { name: "Bajaj" },
        { name: "Vespa" },
        { name: "KTM" }
      ],
      choosedCashLoan: { details: {} },
      kredit: {
        key: 4,
        title: "Julo Kredit",
        details: {
          loanDurationStart: 1,
          loanDurationEnd: 1,
          loanAmountStart: 3,
          loanAmountEnd: 3
        },
        class: "color13"
      },
      cashLoans: [
        {
          key: 1,
          headerImgSrc: "ic_cicil.svg",
          title: "Julo Cicil",
          text: "3-6 Bulan | 2-4%/bln",
          details: {
            loanDurationStart: 6,
            loanDurationEnd: 3,
            loanAmountStart: 20,
            loanAmountEnd: 80,
            monthlyInterest: 4,
            cashback: 2
          },
          class: "color2"
        },
        {
          key: 2,
          headerImgSrc: "ic_mini.svg",
          title: "Julo Mini",
          text: "1 Bulan | 10%/bln",
          details: {
            loanDurationStart: 1,
            loanDurationEnd: 1,
            loanAmountStart: 10,
            loanAmountEnd: 10,
            paybackAmount: 11
          },
          class: "color1"
        },
        {
          key: 3,
          headerImgSrc: "ic_agunan.svg",
          title: "Julo Agunan",
          text: "Pinjam dengan jaminan",
          details: {
            loanDurationType: [
              {
                label: "Motor",
                key: "motorcycle",
                category: "vehicle"
              },
              {
                label: "Mobil",
                key: "car",
                category: "vehicle"
              },
              {
                label: "Sertifikat",
                key: "sertificate",
                category: "document"
              }
            ]
          },
          class: "color3"
        }
      ]
    };
  },
  computed: { ...mapState(["productNScore", "application"]) },
  methods: {
    ...mapActions([
      "saveProduct",
      "collateral",
      "instantExpire",
      "eligibleInstantExpire"
    ]),
    ...mapMutations([types.LOGOUT]),
    resetAgunanClass: function() {
      this.choosedCashLoan.details.loanDurationType.forEach(x => {
        x.class = "unselectedBtn";
      });
    },
    chooseProduct: function(cashLoan) {
      this.productDialog = true;
      this.choosedCashLoan = cashLoan;
      let medianLoanAmountHalf =
        (cashLoan.details.loanAmountEnd - cashLoan.details.loanAmountStart) / 2;
      medianLoanAmountHalf =
        (medianLoanAmountHalf / 2.5) % 2 == 1
          ? medianLoanAmountHalf + 2.5
          : medianLoanAmountHalf;

      let medianLoanDurationHalf =
        (cashLoan.details.loanDurationEnd -
          cashLoan.details.loanDurationStart) /
        2;
      const median = {
        loanDuration:
          cashLoan.details.loanDurationStart + parseInt(medianLoanDurationHalf),
        loanAmount: cashLoan.details.loanAmountStart + medianLoanAmountHalf
      };
      this.productSelection = median; //rangeDefault;
      if (
        cashLoan.details.loanDurationStart == cashLoan.details.loanDurationEnd
      ) {
        this.productSelection.loanDuration = cashLoan.details.loanDurationStart;
      }
      if (cashLoan.details.loanAmountStart == cashLoan.details.loanAmountEnd) {
        this.productSelection.loanAmount = cashLoan.details.loanAmountStart;
      }
      this.productSelection.product = cashLoan.key;
      if (cashLoan.title == "Julo Agunan") {
        this.resetAgunanClass();
        this.showProductDialogText = false;
      } else {
        this.showProductDialogText = true;
      }
    },
    confirmProductShow: async function() {
      this.productDialog = false;
      this.confirmLoanDialog = true;
    },
    ajukanPinjaman: async function() {
      this.confirmLoanDialog = false;

      //CHECK AGUNAN
      const product = this.productNScore.product_lines.find(
        x => x.product_line_code == this.productSelection.product
      );

      const productSelection = { ...this.productSelection };
      productSelection.loanAmount *= 100000;

      const statusCode = await this.saveProduct(productSelection);

      if (["CTL", "CTL1", "CTL2"].indexOf(product.product_line_type) != -1) {
        const collateralResult = await this.collateral(productSelection);
      }
      if (statusCode) {
        //const routename = statusCodeMappingRoute(statusCode);
        this.$router.push({ name: "document" });
      }
    },
    showDetail: function(i) {
      this.resetAgunanClass();
      this.$set(this.choosedCashLoan.details.loanDurationType, i, {
        ...this.choosedCashLoan.details.loanDurationType[i],
        class: "selectedBtn"
      });
      const { key, category } = this.choosedCashLoan.details.loanDurationType[
        i
      ];
      this.productSelection = {
        ...this.productSelection,
        key,
        category
      };
      this.showProductDialogText = true;
    },
    filterPage: function() {
      let page = false;
      if (this.choosedCashLoan.title.toLowerCase() == "julo mini") {
        page = "JuloMiniProductDetailFragment";
      } else if (this.choosedCashLoan.title.toLowerCase() == "julo cicil") {
        page = "JuloCicilProductDetailFragment";
      } else if (this.choosedCashLoan.title.toLowerCase() == "julo agunan") {
        page = "BFILoanFragment";
      }
      return page;
    },
    doInstantExpire: async function() {
      //send API
      const result = await this.instantExpire();
      if (result) {
        //auto logout
        await this[types.LOGOUT]();
        window.location.replace("https://go.onelink.me/zOQD/93d068ac");
        return false;
      }
    }
  },
  watch: {
    productSelection: {
      handler: function(val) {
        let key = false,
          value = false;
        for (let i in val) {
          if (val[i] != this.clonedproductSelection[i]) {
            key = i;
            value = val[i];
            break;
          }
        }
        if (!key || !value) {
          return;
        }

        // if (value.startsWith("0")) {
        //   return;
        // }
        //filter label
        let label = false,
          page = false,
          type = false;
        switch (key) {
          case "loanAmount":
            label = "loan_amount";
            value *= 100000;
            page = "JuloCicilProductDetailFragment";
            type = "Slider";
            break;
          case "loanDuration":
            label = "loan_duration";
            page = "JuloCicilProductDetailFragment";
            type = "Slider";
            break;
          case "year":
            label = "manufacture_year";
            page = "BFILoanFragment";
            type = "List";
            break;
          case "model":
            page = "BFILoanFragment";
            type = "List";
            if (val.key == "motorcycle" || val.key == "car") {
              label = "vehicle_model";
            } else {
              label = "certificate_type";
            }
            break;
        }
        const action = `${type} : "${label}", clicked item: ${value}`;
        const obj = this.$navlog.mappingObj(page, action);
        this.$navlog.save(obj);
        //last step
        this.clonedproductSelection = { ...val };
      },
      deep: true
    },
    productDialog: function(val) {
      let page = this.filterPage();
      let action = val ? "Screen opened" : "Screen closed";

      const obj = this.$navlog.mappingObj(page, action);
      this.$navlog.save(obj);
    }
  },
  beforeMount() {
    //check already save product
    if (this.application.product_line) {
      this.$router.push({ name: "document" });
      return;
    }

    //prepare data for display
    this.scoreUser = _.pick(this.productNScore, ["score", "message"]);
    let lottieUrl = "first_layer_score.json";
    this.circleColor = "circleColor1";
    if (this.scoreUser.score.toLowerCase() === "a") {
      //this.$set(this.lottieOptions, 'animationData', animationData2);
      lottieUrl = "fifth_layer_score.json";
      this.circleColor = "circleColor5";
    } else if (this.scoreUser.score.toLowerCase() == "a-") {
      lottieUrl = "fourth_layer_score.json";
      this.circleColor = "circleColor4";
    } else if (this.scoreUser.score.toLowerCase() == "b+") {
      lottieUrl = "third_layer_score.json";
      this.circleColor = "circleColor3";
    } else if (this.scoreUser.score.toLowerCase() == "b-") {
      lottieUrl = "second_layer_score.json";
      this.circleColor = "circleColor2";
    }
    this.lottieOptions.animationData = require(`@/assets/lottie/${lottieUrl}`);
    this.choosedCashLoan = this.cashLoans[2];

    const agunan = this.cashLoans.findIndex(x => x.title == "Julo Agunan");
    this.cashLoans[agunan].details.loanDurationType.forEach(x => {
      x.class = "unselectedBtn";
    });
    this.cashLoans.forEach(c => {
      c.headerImg = require(`@/assets/Product/${c.headerImgSrc}`);
    });

    //filter product
    for (let product of this.productNScore.product_lines) {
      if (["MTL", "MTL1", "MTL2"].indexOf(product.product_line_type) != -1) {
        const cashLoan = this.cashLoans.find(x => x.key == 1);
        if (cashLoan) {
          cashLoan.show =
            this.productNScore.products.indexOf(product.product_line_code) !==
            -1;
          cashLoan.key = product.product_line_code;
          cashLoan.details = {
            ...cashLoan.details,
            loanDurationStart: product.min_duration,
            loanDurationEnd: product.max_duration,
            loanAmountStart: product.min_amount / 100000,
            loanAmountEnd: product.max_amount / 100000,
            monthlyInterest: product.max_interest_rate
          };
        }
      } else if (
        ["STL", "STL1", "STL2"].indexOf(product.product_line_type) != -1
      ) {
        const cashLoan = this.cashLoans.find(x => x.key == 2);
        if (cashLoan) {
          cashLoan.show =
            this.productNScore.products.indexOf(product.product_line_code) !==
            -1;
          cashLoan.key = product.product_line_code;
          cashLoan.details = {
            loanDurationStart: product.min_duration,
            loanDurationEnd: product.max_duration,
            loanAmountStart: product.min_amount / 100000,
            loanAmountEnd: product.max_amount / 100000,
            paybackAmount:
              (product.max_amount / 100000) * (product.max_interest_rate + 1)
          };
        }
      } else if (["CTL", "CTL1"].indexOf(product.product_line_type) != -1) {
        const cashLoan = this.cashLoans.find(x => x.key == 3);
        if (cashLoan) {
          cashLoan.show =
            this.productNScore.products.indexOf(product.product_line_code) !==
            -1;
          cashLoan.key = product.product_line_code;
        }
      }
    }
  },
  async mounted() {
    this.clonedproductSelection = { ...this.productSelection };

    //if eligible instant expires and got C
    if (this.scoreUser.score == "C") {
      let eligible = await this.eligibleInstantExpire();
      if (eligible) {
        this.instantExpirePopUp = true;
      }
    }
  }
};
</script>

<style scoped>
.header {
  height: 240px;
  padding-top: 130px;
  text-align: center;
  font-size: 16px;
  font-weight: bold;
  color: white;
  background: linear-gradient(
      to bottom right,
      rgb(0, 172, 240, 0.7) 0%,
      rgb(31, 136, 209, 0.7) 100%
    ),
    url("../assets/Header Image/Form.jpg") no-repeat center center;
  /* background-repeat: no-repeat;
  background-size: 100%; */
  background-size: 100% auto;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
}
.smallPadding {
  padding-left: 2px !important;
  padding-right: 2px !important;
}
.verticalLine {
  width: 2px;
  background-color: #d3d3d3;
  height: 100%;
  float: left;
}
.divBlock {
  margin-top: 10px;
  display: block;
  font-weight: bold;
  margin-bottom: 10px;
}
.buttonNext {
  width: 100%;
  margin-top: 15px;
  margin-bottom: 5px;
}
.borderDiv {
  margin-top: 10px;
  border: 1.5px solid #00acf0;
  padding: 3px;
  border-radius: 10px;
}
.unselectedBtn {
  background-color: rgba(255, 255, 255, 0.4) !important;
  color: white;
}
.selectedBtn {
  background-color: rgba(255, 255, 255) !important;
  color: purple;
}
.divKredit {
  margin-top: 10px;
  margin-bottom: 10px;
}
.relative {
  position: relative;
  height: 110px;
  width: 110px;
}
#circle {
  position: absolute;
  top: 58px;
  left: 62px;
  padding-top: 9px;
  padding-left: 3px;
  text-align: center;
  font-size: 22px;
  background: white;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  -webkit-box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2);
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2);
}
.circleColor5 {
  color: rgb(0, 172, 240);
}
.circleColor4 {
  color: rgb(49, 114, 189);
}
.circleColor3 {
  color: rgb(95, 59, 142);
}
.circleColor2 {
  color: rgb(161, 68, 98);
}
.circleColor1 {
  color: rgb(218, 76, 61);
}
</style>
