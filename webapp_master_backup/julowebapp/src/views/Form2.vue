<template>
  <div class="textHeader">
    <v-container grid-list-xl>
      <v-layout row>
        <v-flex xs12 sm8 md6 offset-xs0 offset-sm2 offset-md3>
          <div class="center">
            <form data-vv-scope="supportingDataForm">
              <!--Informasi Keluarga-->
              <span class="divBlock">Informasi Keluarga</span>

              <div v-if="personalData.civilStatus == 'Menikah'">
                <label class="labelInput">Nama pasangan</label>
                <v-text-field
                  autofocus
                  outline
                  placeholder="Nama pasangan"
                  v-model="supportingData.spouseName"
                  v-validate="'required'"
                  :error-messages="errors.collect('Nama pasangan')"
                  data-vv-name="Nama pasangan"
                  required
                  @keypress="checkValidName"
                  @input="e=> checkValidNamePaste('spouseName', e)"
                  id="spouseName"
                  key="spouseName"
                ></v-text-field>
                <div class="errorInput">
                  <span>{{ errors.first(`supportingDataForm.${'Nama pasangan'}`) }}</span>
                </div>

                <v-layout>
                  <v-flex xs6 class="smallPadding">
                    <label class="labelInput">Nomor HP Pasangan</label>

                    <v-text-field
                      outline
                      placeholder="Nomor HP Pasangan"
                      v-model="supportingData.spouseNo"
                      data-vv-delay="300"
                      v-validate="{ required: true, numeric: true, min:10, max:15, regex: /^(08.*$).*/, phoneNumberDistict: this.getPhoneNumbers('spouseNo', {kinNo: supportingData.kinNo}) }"
                      :error-messages="errors.collect('Nomor HP Pasangan')"
                      data-vv-name="Nomor HP Pasangan"
                      required
                      @keypress="checkNumber"
                      id="spouseNo"
                    ></v-text-field>
                    <div class="errorInput">
                      <span>{{ errors.first(`supportingDataForm.${'Nomor HP Pasangan'}`) }}</span>
                    </div>
                  </v-flex>
                  <v-flex xs6 class="smallPadding">
                    <label class="labelInput">Tanggal lahir pasangan</label>
                    <v-menu
                      ref="menuDobSpouse"
                      :close-on-content-click="false"
                      v-model="menuDobSpouse"
                      :return-value.sync="dobSpouse"
                      lazy
                      transition="scale-transition"
                      offset-y
                      full-width
                      min-width="290px"
                    >
                      <v-text-field
                        outline
                        slot="activator"
                        v-model="supportingData.formatedDobSpouse"
                        append-icon="event"
                        readonly
                        v-validate="'required'"
                        :error-messages="errors.collect('Tanggal lahir pasangan')"
                        placeholder="DD/MM/YYYY"
                        data-vv-name="Tanggal lahir pasangan"
                        required
                        id="dobSpouse"
                      ></v-text-field>
                      <v-date-picker
                        ref="dobSpousePicker"
                        v-model="supportingData.dobSpouse"
                        @input="$refs.menuDobSpouse.save(dobSpouse)"
                        min="1950-01-01"
                        :max="moment().format('YYYY-MM-DD')"
                      ></v-date-picker>
                    </v-menu>
                    <div class="errorInput">
                      <span>{{ errors.first(`supportingDataForm.${'Tanggal lahir pasangan'}`) }}</span>
                    </div>
                  </v-flex>
                </v-layout>
              </div>
              <div v-else>
                <label class="labelInput">Nama Orang Tua</label>
                <v-text-field
                  outline
                  placeholder="Nama Orang Tua"
                  v-model="supportingData.parentsName"
                  data-vv-delay="300"
                  v-validate="'required'"
                  :error-messages="errors.collect('Nama Orang Tua')"
                  data-vv-name="Nama Orang Tua"
                  required
                  @keypress="checkValidName"
                  @input="e=> checkValidNamePaste('parentsName', e)"
                  id="parentsName"
                ></v-text-field>
                <div class="errorInput">
                  <span>{{ errors.first(`supportingDataForm.${'Nama Orang Tua'}`) }}</span>
                </div>

                <label class="labelInput">Nomor HP Orang Tua</label>
                <v-text-field
                  outline
                  placeholder="Nomor HP Orang Tua"
                  v-model="supportingData.parentsNo"
                  data-vv-delay="300"
                  v-validate="{ required: true, numeric: true, min:10, max:15, regex: /^(08.*$).*/, phoneNumberDistict: this.getPhoneNumbers('parentsNo', {kinNo: supportingData.kinNo}) }"
                  :error-messages="errors.collect('Nomor HP Orang Tua')"
                  data-vv-name="Nomor HP Orang Tua"
                  required
                  @keypress="checkNumber"
                  id="parentsNo"
                ></v-text-field>
                <div class="errorInput">
                  <span>{{ errors.first(`supportingDataForm.${'Nomor HP Orang Tua'}`) }}</span>
                </div>
              </div>

              <span class="divBlock">Informasi Keluarga Kandung</span>

              <label class="labelInput">Nama Keluarga Kandung</label>
              <v-text-field
                outline
                placeholder="Nama Keluarga Kandung"
                v-model="supportingData.nameOfKin"
                data-vv-delay="300"
                v-validate="'required'"
                :error-messages="errors.collect('Nama Keluarga Kandung')"
                data-vv-name="Nama Keluarga Kandung"
                required
                @keypress="checkValidName"
                @input="e=> checkValidNamePaste('nameOfKin', e)"
                id="nameOfKin"
              ></v-text-field>
              <div class="errorInput">
                <span>{{ errors.first(`supportingDataForm.${'Nama Keluarga Kandung'}`) }}</span>
              </div>

              <label class="labelInput">Nomor HP Keluarga Kandung</label>
              <v-text-field
                outline
                placeholder="Nomor HP Keluarga Kandung"
                v-model="supportingData.kinNo"
                data-vv-delay="300"
                v-validate="{ required: true, numeric: true, min:10, max:15, regex: /^(08.*$).*/, phoneNumberDistict: this.getPhoneNumbers('kinNo', personalData.civilStatus == 'Menikah'? {spouseNo: supportingData.spouseNo} : {parentsNo: supportingData.parentsNo}) }"
                :error-messages="errors.collect('Nomor HP Keluarga Kandung')"
                data-vv-name="Nomor HP Keluarga Kandung"
                required
                @keypress="checkNumber"
                id="kinNo"
              ></v-text-field>
              <div class="errorInput">
                <span>{{ errors.first(`supportingDataForm.${'Nomor HP Keluarga Kandung'}`) }}</span>
              </div>

              <label class="labelInput">Hubungan</label>
              <j-select
                :items="relation"
                placeholder="Hubungan"
                v-model="supportingData.relation"
                outline
                v-validate="'required'"
                :error-messages="errors.collect('Hubungan')"
                data-vv-name="Hubungan"
                required
                id="relation"
              ></j-select>
              <div class="errorInput">
                <span>{{ errors.first(`supportingDataForm.${'Hubungan'}`) }}</span>
              </div>
              <!--Informasi Keluarga-->
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
import getPhoneNumbers from "../helper/getPhoneNumbers";
import formatDate from "../helper/formatDatePicker";
import checkValidName2 from "../helper/checkValidName";
import checkNumber2 from "../helper/checkNumber";
// import checkValidMobilePhone from "../helper/checkMobilePhone";
import deleteErrorBag from "../helper/deleteErrorBagManual";

export default {
  data() {
    return {
      relation: [],
      supportingData: {},
      personalData: {},

      clonedsupportingData: {},

      //other
      menuDobSpouse: false,
      dobSpouse: null,
      doneMounted: false
    };
  },
  async mounted() {
    this.$emit("makeBgTransparent", false);
    this.$emit("makeisSubPage", {
      text: "Informasi Keluarga",
      url: "formhead"
    });

    if (localStorage.form1) {
      this.personalData = JSON.parse(localStorage.form1);
    }
    if (localStorage.form2) {
      this.supportingData = JSON.parse(localStorage.form2);
    }
    //dropdown
    //get dropdown
    const dropdownList = await this.dropdown();
    this.relation = dropdownList.kin_relationships;

    this.clonedsupportingData = { ...this.supportingData };
    this.doneMounted = true;
    //validate
    if (localStorage.form2Valid == 2) {
      await this.$validator.validateAll("supportingDataForm");
    }
  },
  methods: {
    ...mapActions(["dropdown"]),
    getPhoneNumbers,
    checkValidName: function(e) {
      checkValidName2(e, this.$route.name);
    },
    checkNumber: function(e) {
      checkNumber2(e, this.$route.name);
    },
    checkValidNamePaste: function(i, e) {
      const newVal = e.replace(/[^a-zA-Z' ]/g, "");
      this.supportingData[i] = newVal;
    },
    saveData: async function() {
      localStorage.form2Valid = 2;
      localStorage.form2 = JSON.stringify(this.supportingData);
      const valid = await this.$validator.validateAll("supportingDataForm");
      if (valid) {
        localStorage.form2Valid = 1;
      }
      this.$router.push({ name: "formHead" });
    }
    // checkHp: async function(sub, field, value) {
    //   checkValidMobilePhone(this.errors, `${sub}Form`, field, this[sub][value]);
    // }
  },
  watch: {
    ["supportingData.dobSpouse"](val) {
      this.supportingData.formatedDobSpouse = formatDate(val);
      this.errors.items = deleteErrorBag(
        "tanggal lahir pasangan",
        "supportingDataForm",
        this.errors.items
      );
    },
    menuDobSpouse(val) {
      if (val) {
        const label = this.$navlog.getConstantByKey("dobSpouse");
        const action = `DatePicker : "${label}" clicked`;
        const obj = this.$navlog.mappingObj(this.$route.name, action);
        this.$navlog.save(obj);
      }
      val &&
        this.$nextTick(
          () => (this.$refs.dobSpousePicker.activePicker = "YEAR")
        );
    },
    supportingData: {
      handler: function(val) {
        if (this.doneMounted) {
          let key = "",
            value = "";
          for (let i in val) {
            if (val[i] != this.clonedsupportingData[i]) {
              key = i;
              value = val[i];
              break;
            }
          }
          if (!key || !value) {
            return;
          }
          //filter type
          const action = this.$navlog.filterTypeByKey(key, value);
          const obj = this.$navlog.mappingObj(this.$route.name, action);
          this.$navlog.save(obj);
          //last step
          this.clonedsupportingData = { ...val };
        }
      },
      deep: true
    }
  }
};
</script>

<style scoped>
.labelInput:hover:focus {
  color: #00acf0;
}

.buttonNext {
  margin-top: 20px;
  margin-bottom: 20px;
  font-size: 14px;
}
</style>
