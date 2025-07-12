<template>
  <div class="textHeader">
    <v-container grid-list-xl>
      <v-layout row>
        <v-flex xs12 sm8 md6 offset-xs0 offset-sm2 offset-md3>
          <div class="center">
            <form data-vv-scope="financialDataForm">
              <!--Penghasilan-->
              <span class="divBlock">Penghasilan & Pengeluaran</span>

              <label class="labelInput">Total penghasilan bersih per Bulan</label>
              <v-text-field
                autofocus
                prefix="Rp. "
                outline
                data-vv-delay="300"
                type="text"
                placeholder="Total penghasilan bersih per Bulan"
                v-model.lazy="financialData.totalMonthlyIncome"
                v-validate="'required'"
                :error-messages="errors.collect('Total penghasilan bersih per Bulan')"
                data-vv-name="Total penghasilan bersih per Bulan"
                required
                style="width: 98%"
                v-money="currencySetting"
                @keypress="checkNumber"
                id="totalMonthlyIncome"
              ></v-text-field>
              <div class="errorInput">
                <span>{{ errors.first(`financialDataForm.${'Total penghasilan bersih per Bulan'}`) }}</span>
              </div>
              <!--Penghasilan-->
              <!--Pengeluaran-->
              <label class="labelInput">
                Total pengeluaran Rumah Tangga per Bulan
                <!-- <span
                  style="font-size:11px"
                >(diluar cicilan dan sewa)</span>-->
              </label>
              <!-- @change="countTotalSpending" -->
              <v-text-field
                prefix="Rp. "
                outline
                data-vv-delay="300"
                type="text"
                placeholder="Total pengeluaran bersih bulanan"
                v-model.lazy="financialData.totalMonthlySpending"
                v-validate="'required'"
                :error-messages="errors.collect('Total pengeluaran bersih bulanan')"
                data-vv-name="Total pengeluaran bersih bulanan"
                required
                v-money="currencySetting"
                style="width: 98%"
                id="totalMonthlySpending"
              ></v-text-field>
              <div class="errorInput">
                <span>{{ errors.first(`financialDataForm.${'Total pengeluaran bersih bulanan'}`) }}</span>
              </div>

              <label class="labelInput">Total cicilan/sewa rumah per Bulan</label>
              <v-text-field
                prefix="Rp. "
                outline
                data-vv-delay="300"
                type="text"
                placeholder="Total cicilan/sewa rumah per Bulan"
                v-model.lazy="financialData.totalHouseRentPerMonth"
                v-validate="'required'"
                :error-messages="errors.collect('Total cicilan sewa rumah per Bulan')"
                data-vv-name="Total cicilan sewa rumah per Bulan"
                v-money="currencySetting"
                required
                style="width: 98%"
                id="totalHouseRentPerMonth"
              ></v-text-field>
              <div class="errorInput">
                <span>{{ errors.first(`financialDataForm.${'Total cicilan sewa rumah per Bulan'}`) }}</span>
              </div>

              <label class="labelInput">Total cicilan hutang per bulan</label>
              <v-text-field
                prefix="Rp. "
                outline
                data-vv-delay="300"
                type="text"
                placeholder="Total cicilan hutang per bulan"
                v-model.lazy="financialData.totalMonthlyDebt"
                v-validate="'required'"
                :error-messages="errors.collect('Total cicilan hutang per bulan')"
                data-vv-name="Total cicilan hutang per bulan"
                v-money="currencySetting"
                required
                style="width: 98%"
                id="totalMonthlyDebt"
              ></v-text-field>
              <div class="errorInput">
                <span>{{ errors.first(`financialDataForm.${'Total cicilan hutang per bulan'}`) }}</span>
              </div>

              <!-- <label class="labelInput">Total pengeluaran akumulatif per Bulan</label>
              <table style="width: 100%">
                <tr>
                  <td style="width: 1%">Rp.</td>
                  <td>
                    <v-text-field
                      outline
                      type="text"
                      placeholder="Total pengeluaran akumulatif per Bulan"
                      v-model="financialData.totalAccumulation"
                      style="width: 98%"
                    ></v-text-field>
                  </td>
                  <td style="width: 1%">,-</td>
                </tr>
              </table>-->
              <!--Pengeluaran-->
              <label class="labelInput">Penghasilan bersih rata-rata per Bulan, 3 tahun terakhir</label>(Tidak Wajib)
              <v-layout
                v-for="(net,i) in financialData.netMonthlyIncome"
                :key="i"
                wrap
                style="margin-left:1px;"
              >
                <v-flex xs3 text-xs-center style="padding:0px !important;">
                  <div style="margin-top:5px;border-radius: 4px;border: 1px solid #e5e5e5;">
                    <div class="labelInput" style="margin-top:7px;margin-bottom:7px;">{{net.text}}</div>
                  </div>
                </v-flex>
                <v-flex xs9 style="padding:5px 20px 0px 0px !important;">
                  <v-text-field
                    prefix="Rp. "
                    outline
                    placeholder="Rp. 0,-"
                    v-model="net.value"
                    v-money="currencySetting"
                  ></v-text-field>
                </v-flex>
              </v-layout>

              <!--Aset-->
              <label class="labelInput">Apakah Anda Memiliki Kendaraan pribadi ?</label>
              <!-- <j-select
                    :items="vehicles"
                    placeholder="Kendaraan pribadi"
                    v-model="financialData.vehicle"
                    outline
                    v-validate="'required'"
                    :error-messages="errors.collect('Kendaraan pribadi')"
                    data-vv-name="Kendaraan pribadi"
                    required
              ></j-select>-->
              <v-layout wrap style="margin-left:1px;margin-right:2px;">
                <v-flex
                  xs6
                  md3
                  v-for="(type,k) in vehicles"
                  :key="k"
                  class="bigBtn"
                  style="padding:0px 5px 0px 5px;"
                >
                  <j-btn
                    large
                    depressed
                    block
                    :color="type === financialData.vehicle ? 'color8' : 'grey'"
                    :dark="type === financialData.vehicle"
                    :outline="type !== financialData.vehicle"
                    @click="modifiedVehicle(type)"
                  >{{type}}</j-btn>
                </v-flex>
              </v-layout>
              <div class="errorInput">
                <!-- <span>{{ errors.first(`financialDataForm.${'Kendaraan pribadi'}`) }}</span> -->
                <span>{{errorvehicle ? 'Kendaraan pribadi harus diisi.' : ''}}</span>
              </div>

              <div v-if=" financialData.vehicle && financialData.vehicle !== 'Tidak punya'">
                <label class="labelInput">Status Kepemilikan</label>
                <j-select
                  :items="ownerships"
                  placeholder="Kepemilikan"
                  v-model="financialData.ownership"
                  outline
                  v-validate="'required'"
                  :error-messages="errors.collect('Kepemilikan')"
                  data-vv-name="Kepemilikan"
                  required
                  id="ownership"
                ></j-select>
                <div class="errorInput">
                  <span>{{ errors.first(`financialDataForm.${'Kepemilikan'}`) }}</span>
                </div>
              </div>

              <!--Aset-->
              <label class="divBlock">Informasi Rekening</label>
              <div>
                <label>Mohon pastikan informasi rekening bank atas nama Anda sendiri</label>
              </div>
              <!--Perbankan-->
              <label class="labelInput">
                Nama bank rekening pribadi
                <span style="font-size:11px">(untuk pencarian dana JULO)</span>
              </label>
              <v-autocomplete
                @keypress="checkValidName"
                @input="e=> checkValidNamePaste('bankSearch', e)"
                class="inputHeight"
                :search-input.sync="financialData.bankSearch"
                :items="bank"
                placeholder="Nama Bank"
                v-model="financialData.bankName"
                outline
                v-validate="'required'"
                :error-messages="errors.collect('Nama Bank')"
                data-vv-name="Nama Bank"
                required
                :menu-props="{ closeOnContentClick:true }"
                id="bankSearch"
              >
                <template slot="no-data">
                  <v-list-tile @click="selectNoDatabankName">
                    <v-list-tile-title>{{financialData.bankSearch}}</v-list-tile-title>
                  </v-list-tile>
                </template>
              </v-autocomplete>
              <div class="errorInput">
                <span>{{ errors.first(`financialDataForm.${'Nama Bank'}`) }}</span>
              </div>

              <!-- <label class="labelInput">Cabang Bank</label>
            <v-text-field
              outline
              placeholder="Cabang Bank"
              v-model="personalData.bankBranch"
              data-vv-delay="300"
              v-validate="'required'"
              :error-messages="errors.collect('Cabang Bank')"
              data-vv-name="Cabang Bank"
              required
            ></v-text-field>
            <div class="errorInput">
              <span>{{ errors.first(`financialDataForm.${'Cabang Bank'}`) }}</span>
              </div>-->
              <label class="labelInput">
                Nomor Rekening Pribadi
                <span style="font-size:11px">(harus atas nama pemohon)</span>
              </label>
              <v-text-field
                outline
                placeholder="Nomor Rekening Pribadi"
                v-model="financialData.accNum"
                data-vv-delay="300"
                v-validate="'required|numeric'"
                :error-messages="errors.collect('Nomor Rekening Pribadi')"
                data-vv-name="Nomor Rekening Pribadi"
                @keypress="checkNumber"
                required
                id="accNum"
              ></v-text-field>
              <div class="errorInput">
                <span>{{ errors.first(`financialDataForm.${'Nomor Rekening Pribadi'}`) }}</span>
              </div>

              <label class="labelInput">
                Nama Pemilik Rekening
                <span style="font-size:11px">(harus atas nama pemohon)</span>
              </label>
              <v-text-field
                @keypress="checkValidName"
                @input="e=> checkValidNamePaste('accName', e)"
                outline
                placeholder="Nama Pemilik Rekening"
                v-model="financialData.accName"
                data-vv-delay="300"
                v-validate="'required'"
                :error-messages="errors.collect('Nama Pemilik Rekening')"
                data-vv-name="Nama Pemilik Rekening"
                required
                id="accName"
              ></v-text-field>
              <div class="errorInput">
                <span>{{ errors.first(`financialDataForm.${'Nama Pemilik Rekening'}`) }}</span>
              </div>
              <!--Perbankan-->
              <!--Informasi pinjaman-->
              <label class="labelInput">Tujuan pinjaman</label>
              <j-select
                :items="loanPurposeCategories"
                placeholder="Tujuan pinjaman"
                v-model="financialData.loanPurposeCategory"
                outline
                v-validate="'required'"
                :error-messages="errors.collect('Tujuan pinjaman')"
                data-vv-name="Tujuan pinjaman"
                required
                id="loanPurposeCategory"
              ></j-select>
              <div class="errorInput">
                <span>{{ errors.first(`financialDataForm.${'Tujuan pinjaman'}`) }}</span>
              </div>

              <label class="labelInput">Jelaskan tujuan pinjaman</label>
              <v-textarea
                outline
                placeholder="Jelaskan tujuan pinjaman"
                v-model="financialData.loanPurposeDescription"
                v-validate="'required|min:20'"
                :error-messages="errors.collect('Jelaskan tujuan pinjaman')"
                data-vv-name="Jelaskan tujuan pinjaman"
                required
                @keypress="inputNavlog"
              ></v-textarea>
              <div>Minimal 20 karakter. Anda telah menginput {{financialData.loanPurposeDescription? financialData.loanPurposeDescription.length: 0}} karakter</div>
              <!-- <div class="errorInput">
                <span>{{ errors.first(`financialDataForm.${'Jelaskan tujuan pinjaman'}`) }}</span>
              </div>-->

              <label class="labelInput">Dari mana tahu JULO ?</label>
              <!-- <j-select
              :items="knowJULOfroms"
              placeholder="Dari mana tahu JULO"
              v-model="financialData.knowJULOfrom"
              outline
              v-validate="'required'"
              :error-messages="errors.collect('Dari mana tahu JULO')"
              data-vv-name="Dari mana tahu JULO"
              required
              ></j-select>-->
              <v-layout wrap style="margin-left:1px;margin-right:2px;">
                <v-flex
                  xs6
                  md3
                  v-for="(type,k) in knowJULOfroms"
                  :key="k"
                  class="bigBtn"
                  style="padding:0px 5px 0px 5px;"
                >
                  <j-btn
                    depressed
                    block
                    :color="type === financialData.knowJULOfrom ? 'color8' : 'grey'"
                    :dark="type === financialData.knowJULOfrom"
                    :outline="type !== financialData.knowJULOfrom"
                    @click="modifiedKnowJULOfrom(type)"
                  >{{type}}</j-btn>
                </v-flex>
              </v-layout>
              <div class="errorInput">
                <!-- <span>{{ errors.first(`financialDataForm.${'Dari mana tahu JULO'}`) }}</span> -->
                <span>{{errorknowJULOfrom ? 'Dari mana tahu JULO harus diisi.' : ''}}</span>
              </div>
              <!--Informasi pinjaman-->
              <!--Finalisasi-->
              <label class="labelInput">Kode Referral</label>
              <small>(Tidak Wajib)</small>
              <v-text-field
                outline
                type="text"
                placeholder="Kode Referral"
                v-model="financialData.referralCode"
                @keypress="inputNavlog"
                id="referralCode"
              ></v-text-field>
              <!--Finalisasi-->
            </form>
          </div>
          <div class="buttonNext" style="margin-right:12px;">
            <j-btn @click="saveData" color="colorbutton" block dark large>Simpan</j-btn>
          </div>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import { VMoney } from "v-money";
import moment from "moment";
import checkValidName2 from "../helper/checkValidName";
import checkNumber2 from "../helper/checkNumber";
import parseCurrencyToInt from "../helper/parseCurrencytoInt";
const thisYear = moment().format("YYYY");
export default {
  data() {
    return {
      financialData: {
        //totalAccumulation: 0,
        totalMonthlyDebt: 0,
        totalHouseRentPerMonth: 0,
        totalMonthlySpending: 0,
        netMonthlyIncome: [],
        thisYear
      },

      clonedfinancialData: {},
      clonednetMonthlyIncome: {},
      doneMounted: false,
      hasAddbankName: false,

      //dropdown
      bank: [],
      vehicles: [],
      ownerships: [],

      loanPurposeCategories: [
        "Modal usaha",
        "Kebutuhan sehari-hari",
        "Membayar hutang lainnya",
        "Biaya pendidikan",
        "Biaya kesehatan",
        "Belanja Online",
        "Renovasi Rumah"
      ],
      knowJULOfroms: [
        "Teman/saudara",
        "Facebook",
        "Artikel Online",
        "Tokopedia",
        "Flyer",
        "DOKU",
        "Iklan Online",
        "Google Playstore"
      ],
      currencySetting: {
        thousands: ".",
        precision: 0
      },

      errorvehicle: false,
      errorknowJULOfrom: false
    };
  },
  directives: { money: VMoney },
  methods: {
    ...mapActions(["dropdown"]),
    checkValidName: function(e) {
      checkValidName2(e, this.$route.name);
    },
    checkNumber: function(e) {
      checkNumber2(e, this.$route.name);
    },
    checkValidNamePaste: function(i, e) {
      const newVal = e.replace(/[^a-zA-Z' ]/g, "");
      this.financialData[i] = newVal;
    },
    // countTotalSpending: function() {
    //   this.financialData.totalAccumulation =
    //     parseInt(this.financialData.totalMonthlyDebt) +
    //     parseInt(this.financialData.totalHouseRentPerMonth) +
    //     parseInt(this.financialData.totalMonthlySpending);
    // },

    modifiedVehicle: function(vehicle) {
      if (vehicle === this.financialData.vehicle) {
        this.$set(this.financialData, "vehicle", "");
        this.errorvehicle = true;
      } else {
        this.$set(this.financialData, "vehicle", vehicle);
        this.errorvehicle = false;
      }
    },
    modifiedKnowJULOfrom: function(knowJULOfrom) {
      if (knowJULOfrom === this.financialData.knowJULOfrom) {
        this.$set(this.financialData, "knowJULOfrom", "");
        this.errorknowJULOfrom = true;
      } else {
        this.$set(this.financialData, "knowJULOfrom", knowJULOfrom);
        this.errorknowJULOfrom = false;
      }
    },
    saveData: async function() {
      localStorage.form4Valid = 2;
      localStorage.form4 = JSON.stringify(this.financialData);
      const valid = await this.$validator.validateAll("financialDataForm");
      if (
        valid &&
        this.financialData.vehicle &&
        this.financialData.knowJULOfrom
      ) {
        localStorage.form4Valid = 1;
      }

      this.$router.push({ name: "formHead" });
    },
    inputNavlog: function(e) {
      this.$navlog.inputKey(e, this.$route.name);
    },
    selectNoDatabankName: function() {
      let i = this.bank.length;
      if (this.hasAddbankName) {
        i--;
      }
      this.$set(this.bank, i, this.financialData.bankSearch);
      this.financialData.college = this.bank[i];
      this.hasAddbankName = true;
    }
  },
  watch: {
    financialData: {
      handler: function(val) {
        if (this.doneMounted) {
          let key = false,
            value = false;
          for (let i in val) {
            if (val[i] != this.clonedfinancialData[i]) {
              key = i;
              value = val[i];
              break;
            }
          }
          if (!key || !value) {
            return;
          }

          if (value.startsWith("0")) {
            return;
          }
          if (
            key == "totalMonthlyIncome" ||
            key == "totalMonthlySpending" ||
            key == "totalHouseRentPerMonth" ||
            key == "totalMonthlyDebt"
          ) {
            let checkVMoney = false;
            const valArr = value.split(".");
            for (let i in valArr) {
              if (valArr[i].length > 3) {
                checkVMoney = true;
                break;
              }
            }
            if (checkVMoney) {
              return;
            }
          }
          //filter type
          const action = this.$navlog.filterTypeByKey(key, value);

          const obj = this.$navlog.mappingObj(this.$route.name, action);
          this.$navlog.save(obj);
          //last step
          this.clonedfinancialData = { ...val };
        }
      },
      deep: true
    },
    ["financialData.netMonthlyIncome"]: {
      handler: function(val) {
        let data = false;
        let datai = -1;
        if (!this.clonednetMonthlyIncome) {
          return;
        }

        for (let i in val) {
          if (this.clonednetMonthlyIncome[i].value !== val[i].value) {
            datai = i;
            data = val[i];
            break;
          }
        }
        if (!data) {
          return;
        }
        if (data.value.startsWith("0")) {
          return;
        }

        let checkVMoney = false;
        const valArr = data.value.split(".");
        for (let i in valArr) {
          if (valArr[i].length > 3) {
            checkVMoney = true;
            break;
          }
        }
        if (checkVMoney) {
          return;
        }

        // //filter type
        const action = `Typed in: "income_${parseInt(datai) +
          1}", typed text: ${data.value}`;
        const obj = this.$navlog.mappingObj(this.$route.name, action);
        this.$navlog.save(obj);
        // //last step
        this.clonednetMonthlyIncome = JSON.parse(JSON.stringify(val));
      },
      deep: true
    }
  },
  // watch: {
  //   ["financialData.totalMonthlyIncome"]: function(newValue) {
  //     const result = newValue
  //       .replace(/\D/g, "")
  //       .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  //     Vue.nextTick(() => (this.financialData.totalMonthlyIncome = result));
  //   }
  // },
  async beforeMount() {
    if (localStorage.form4) {
      this.financialData = JSON.parse(localStorage.form4);
    } else {
      if (this.financialData.netMonthlyIncome.length < 3) {
        const netMonthlyIncome = [];
        for (var i = 1; i <= 3; i++) {
          netMonthlyIncome.push({
            text: parseInt(thisYear) - i,
            value: 0
          });
        }
        this.financialData.netMonthlyIncome = netMonthlyIncome;
      }
    }

    //get dropdown
    const dropdownList = await this.dropdown();
    this.bank = dropdownList.banks;
    this.vehicles = dropdownList.vehicle_types;

    this.ownerships = dropdownList.vehicle_ownerships;
    this.loanPurposeCategories = dropdownList.loan_purposes;
    this.knowJULOfroms = dropdownList.marketing_sources;

    this.$emit("makeBgTransparent", false);
    this.$emit("makeisSubPage", {
      text: "Keuangan",
      url: "formhead"
    });

    //
  },
  async mounted() {
    this.clonedfinancialData = { ...this.financialData };
    this.clonednetMonthlyIncome = JSON.parse(
      JSON.stringify(this.financialData.netMonthlyIncome)
    ); //{ ...this.financialData.netMonthlyIncome };
    this.doneMounted = true;
    //validate
    if (localStorage.form4Valid == 2) {
      await this.$validator.validateAll("financialDataForm");
      if (!this.financialData.vehicle || this.financialData.vehicle == "") {
        this.errorvehicle = true;
      }
      if (
        !this.financialData.knowJULOfrom ||
        this.financialData.knowJULOfrom == ""
      ) {
        this.errorknowJULOfrom = true;
      }
    }
  }
};
</script>

<style scoped>
</style>
