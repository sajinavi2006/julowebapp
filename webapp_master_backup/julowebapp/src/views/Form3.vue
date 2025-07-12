<template>
  <div class="textHeader">
    <v-container grid-list-xl>
      <v-layout row>
        <v-flex xs12 sm8 md6 offset-xs0 offset-sm2 offset-md3>
          <div class="center">
            <form data-vv-scope="jobEducationDataForm">
              <!--Pekerjaan-->
              <span class="divBlock">Informasi Perkerjaan</span>

              <label class="labelInput">Tipe Pekerjaan</label>
              <!--new one-->
              <v-layout wrap style="margin-left:2px;margin-right:2px;">
                <v-flex
                  xs6
                  md3
                  v-for="(type,k) in jobTypes"
                  :key="k"
                  style="padding:0px 5px 0px 5px;"
                >
                  <j-btn
                    depressed
                    block
                    class="bigBtn"
                    :color="type === jobEducationData.jobType ? 'color8' : 'grey'"
                    :dark="type === jobEducationData.jobType"
                    :outline="type !== jobEducationData.jobType"
                    @click="modifiedJobType(type)"
                  >{{type}}</j-btn>
                </v-flex>
              </v-layout>
              <div class="errorInput">
                <!-- <span>{{ errors.first("jobEducationDataForm.jobType") }}</span> -->
                <span>{{errorJobType ? 'Tipe pekerjaan harus diisi.' : ''}}</span>
              </div>
              <div v-if="!checkEmpty(jobEducationData.jobType)">
                <div
                  v-if="lower(jobEducationData.jobType) !== 'ibu rumah tangga' && lower(jobEducationData.jobType) !== 'mahasiswa' && lower(jobEducationData.jobType) !== 'tidak bekerja'"
                >
                  <label class="labelInput">Bidang Pekerjaan</label>
                  <j-select
                    :items="jobFields"
                    placeholder="Bidang Pekerjaan"
                    v-model="jobEducationData.jobField"
                    outline
                    v-validate="'required'"
                    :error-messages="errors.collect('Bidang Pekerjaan')"
                    data-vv-name="Bidang Pekerjaan"
                    required
                    @change="filterjob"
                    id="jobField"
                  ></j-select>
                  <div class="errorInput">
                    <span>{{ errors.first(`jobEducationDataForm.${'Bidang Pekerjaan'}`) }}</span>
                  </div>

                  <div
                    v-if="lower(jobEducationData.jobType) !== 'ibu rumah tangga' && lower(jobEducationData.jobType) !== 'staf rumah tangga' && lower(jobEducationData.jobType) !== 'mahasiswa' && lower(jobEducationData.jobType) !== 'tidak bekerja'"
                  >
                    <label class="labelInput">Pekerjaan</label>
                    <j-select
                      :items="jobs"
                      placeholder="Pekerjaan"
                      v-model="jobEducationData.job"
                      outline
                      v-validate="'required'"
                      :error-messages="errors.collect('Pekerjaan')"
                      data-vv-name="Pekerjaan"
                      required
                      id="job"
                      key="job"
                    ></j-select>
                    <div class="errorInput">
                      <span>{{ errors.first(`jobEducationDataForm.${'Pekerjaan'}`) }}</span>
                    </div>

                    <label class="labelInput">Nama Perusahaan</label>
                    <v-autocomplete
                      @keypress="checkValidName"
                      @input="e=> checkValidNamePaste('companiesSearch', e)"
                      :search-input.sync="jobEducationData.companiesSearch"
                      :items="companies"
                      placeholder="Nama Perusahaan"
                      v-model="jobEducationData.companyName"
                      outline
                      v-validate="'required'"
                      :error-messages="errors.collect('Nama Perusahaan')"
                      data-vv-name="Nama Perusahaan"
                      required
                      :menu-props="{closeOnContentClick:true }"
                      id="companyName"
                    >
                      <template slot="no-data">
                        <v-list-tile @click="selectNoDataCompanyName">
                          <v-list-tile-title>{{jobEducationData.companiesSearch}}</v-list-tile-title>
                        </v-list-tile>
                      </template>
                    </v-autocomplete>
                    <div class="errorInput">
                      <span>{{ errors.first(`jobEducationDataForm.${'Nama Perusahaan'}`) }}</span>
                    </div>

                    <label class="labelInput">Nomor Telepon Perusahaan</label>
                    <v-text-field
                      outline
                      placeholder="Nomor Telepon Perusahaan"
                      v-model="jobEducationData.companyNo"
                      data-vv-delay="300"
                      v-validate="'numeric|required|min:8'"
                      :error-messages="errors.collect('Nomor Telepon Perusahaan')"
                      data-vv-name="Nomor Telepon Perusahaan"
                      required
                      @keypress="checkNumber"
                      @focusout="checkPhoneNumber('Nomor Telepon Perusahaan','companyNo')"
                      id="companyNo"
                    ></v-text-field>
                    <div class="errorInput">
                      <span>{{ errors.first(`jobEducationDataForm.${'Nomor Telepon Perusahaan'}`) }}</span>
                    </div>

                    <v-layout wrap>
                      <v-flex xs6 class="smallPadding">
                        <label class="labelInput">Mulai pekerjaan</label>
                        <v-menu
                          ref="menustartWorkingDate"
                          :close-on-content-click="false"
                          v-model="menustartWorkingDate"
                          :return-value.sync="startWorkingDate"
                          lazy
                          transition="scale-transition"
                          offset-y
                          full-width
                          min-width="290px"
                        >
                          <v-text-field
                            outline
                            slot="activator"
                            v-model="jobEducationData.startWorkingDateformated"
                            append-icon="event"
                            readonly
                            v-validate="'required'"
                            :error-messages="errors.collect('Mulai pekerjaan')"
                            placeholder="DD/MM/YYYY"
                            data-vv-name="Mulai pekerjaan"
                            required
                            id="startWorkingDate"
                          ></v-text-field>
                          <v-date-picker
                            min="1950-01-01"
                            :max="moment().format('YYYY-MM-DD')"
                            v-model="jobEducationData.startWorkingDate"
                            @input="$refs.menustartWorkingDate.save(startWorkingDate)"
                          ></v-date-picker>
                        </v-menu>
                        <div class="errorInput">
                          <span>{{ errors.first(`jobEducationDataForm.${'Mulai pekerjaan'}`) }}</span>
                        </div>
                      </v-flex>
                      <v-flex xs6 class="smallPadding">
                        <label class="labelInput">Tanggal Gajian</label>
                        <!-- <v-text-field
                        outline
                        placeholder="Tanggal gajian"
                        v-model="jobEducationData.payrollDate"
                        data-vv-delay="300"
                        v-validate="'required|min_value:1|max_value:31'"
                        :error-messages="errors.collect('Tanggal gajian')"
                        data-vv-name="Tanggal gajian"
                        required
                        ></v-text-field>-->
                        <j-select
                          :items="payDays"
                          placeholder="Tanggal gajian"
                          v-model="jobEducationData.payrollDate"
                          outline
                          v-validate="'required'"
                          :error-messages="errors.collect('Tanggal gajian')"
                          data-vv-name="Tanggal gajian"
                          required
                          id="payrollDate"
                        ></j-select>
                        <div class="errorInput">
                          <span>{{ errors.first(`jobEducationDataForm.${'Tanggal gajian'}`) }}</span>
                        </div>
                      </v-flex>

                      <!-- <v-flex
                  xs12
                  class="smallPadding labelInput"
                >Penghasilan bersih rata-rata per Bulan, 3 tahun terakhir (opsional)</v-flex>
                <v-flex
                  xs6
                  class="smallPadding"
                  v-for="(net,i) in jobEducationData.netMonthlyIncome"
                  :key="i"
                >
                  <label class="labelInput">{{net.text}}</label>
                  <v-text-field outline placeholder="Rp. 0,-" v-model="net.value"></v-text-field>
                      </v-flex>-->
                    </v-layout>
                  </div>
                </div>
              </div>

              <span class="divBlock">Informasi Pendidikan</span>

              <label class="labelInput">Pendidikan terakhir</label>
              <j-select
                :items="educations"
                placeholder="Pendidikan terakhir"
                v-model="jobEducationData.lastEducation"
                outline
                v-validate="'required'"
                :error-messages="errors.collect('Pendidikan terakhir')"
                data-vv-name="Pendidikan terakhir"
                required
                id="lastEducation"
              ></j-select>
              <div class="errorInput">
                <span>{{ errors.first(`jobEducationDataForm.${'Pendidikan terakhir'}`) }}</span>
              </div>

              <div
                v-if="jobEducationData.lastEducation == 'Diploma' || jobEducationData.lastEducation == 'S1'|| jobEducationData.lastEducation == 'S2' || jobEducationData.lastEducation == 'S3'"
              >
                <label class="labelInput">Perguruan tinggi</label>
                <v-autocomplete
                  :search-input.sync="jobEducationData.collegeSearch"
                  :items="colleges"
                  placeholder="Perguruan tinggi"
                  v-model="jobEducationData.college"
                  outline
                  v-validate="'required'"
                  :error-messages="errors.collect('Perguruan tinggi')"
                  data-vv-name="Perguruan tinggi"
                  required
                  @keypress="checkValidName"
                  @input="e=> checkValidNamePaste('collegeSearch', e)"
                  id="college"
                  :menu-props="{ closeOnContentClick:true }"
                >
                  <template slot="no-data">
                    <v-list-tile @click="selectNoDatacollege">
                      <v-list-tile-title>{{jobEducationData.collegeSearch}}</v-list-tile-title>
                    </v-list-tile>
                  </template>
                </v-autocomplete>
                <div class="errorInput">
                  <span>{{ errors.first(`jobEducationDataForm.${'Perguruan tinggi'}`) }}</span>
                </div>

                <label class="labelInput">Jurusan</label>

                <j-select
                  outline
                  ref="ddMajorHead"
                  v-show="!jobEducationData.majorsHead"
                  :items="majorsHead"
                  placeholder="Jurusan"
                  v-model="jobEducationData.majorsHead"
                  v-validate="'required'"
                  :error-messages="errors.collect('Jurusan')"
                  data-vv-name="Jurusan"
                  @change="selectMajor"
                  id="majors"
                ></j-select>

                <j-select
                  outline
                  ref="ddMajor"
                  v-show="jobEducationData.majorsHead && !jobEducationData.majors"
                  :items="majors"
                  placeholder="Jurusan"
                  v-model="jobEducationData.majors"
                  v-validate="'required'"
                  :error-messages="errors.collect('Jurusan')"
                  data-vv-name="Jurusan"
                  required
                  id="majors"
                ></j-select>

                <j-select
                  v-show="jobEducationData.majors"
                  :items="majors"
                  v-model="jobEducationData.majors"
                  outline
                  readonly
                  @click:append="resetMajor"
                  @click.native.prevent="resetMajor"
                  id="majors"
                ></j-select>

                <!-- <j-select
                  :items="majors"
                  placeholder="Jurusan"
                  v-model="jobEducationData.major"
                  outline
                  v-validate="'required'"
                  :error-messages="errors.collect('Jurusan')"
                  data-vv-name="Jurusan"
                  required
                ></j-select>-->
                <div class="errorInput">
                  <span>{{ errors.first(`jobEducationDataForm.${'Jurusan'}`) }}</span>
                </div>

                <label class="labelInput">IPK</label>
                <v-text-field
                  outline
                  type="text"
                  placeholder="IPK"
                  v-model="jobEducationData.gpa"
                  v-validate="'required|decimal|max_value:4|min_value:0'"
                  :error-messages="errors.collect('IPK')"
                  data-vv-name="IPK"
                  required
                  id="gpa"
                  @keypress="inputNavlog"
                ></v-text-field>
                <div class="errorInput">
                  <span>{{ errors.first(`jobEducationDataForm.${'IPK'}`) }}</span>
                </div>
              </div>

              <!-- <label class="labelInput">Tahun lulus</label>
              <j-select
                :items="graduationYears"
                placeholder="Tahun lulus"
                v-model="jobEducationData.graduationYear"
                outline
                v-validate="'required'"
                :error-messages="errors.collect('Tahun lulus')"
                data-vv-name="Tahun lulus"
                required
              ></j-select>
              <div class="errorInput">
                <span>{{ errors.first(`jobEducationDataForm.${'Tahun lulus'}`) }}</span>
              </div>-->
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
import moment from "moment";
import formatDate from "../helper/formatDatePicker.js";
import checkValidName2 from "../helper/checkValidName";
import checkNumber2 from "../helper/checkNumber";
import checkPhone from "../helper/checkPhone";
import deleteErrorBag from "../helper/deleteErrorBagManual";
const thisYear = moment().format("YYYY");

export default {
  data() {
    return {
      //dropdown
      jobTypes: [],
      jobNField: [],
      jobFields: [],
      jobs: [],
      educations: ["Diploma", "S1", "S2", "S3", "SD", "SMP", "SMA"],
      colleges: [],
      collegeArea: [],
      collegeNArea: [],
      majors: [],
      majorsNHead: [],
      majorsHead: [],
      graduationYears: _.range(1991, parseInt(thisYear) + 1),
      payDays: _.range(1, 29),
      companies: [],

      //
      jobEducationData: {
        //netMonthlyIncome: []
      },
      clonedjobEducationData: {},

      //other
      menustartWorkingDate: false,
      startWorkingDate: null,
      doneMounted: false,
      hasAddcompanyName: false,
      hasAddcollege: false,
      errorJobType: false,

      dataaaaaa: ["haha", "huhu"]
    };
  },
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
      this.jobEducationData[i] = newVal;
    },
    saveData: async function() {
      localStorage.form3Valid = 2;
      localStorage.form3 = JSON.stringify(this.jobEducationData);
      const valid = await this.$validator.validateAll("jobEducationDataForm");
      if (valid && this.jobEducationData.jobType) {
        localStorage.form3Valid = 1;
      }

      this.$router.push({ name: "formHead" });
    },
    modifiedJobType: function(jobtype) {
      if (jobtype === this.jobEducationData.jobType) {
        this.$set(this.jobEducationData, "jobType", "");
        this.errorJobType = true;
      } else {
        this.$set(this.jobEducationData, "jobType", jobtype);
        this.errorJobType = false;
      }

      if (
        this.jobEducationData.jobType &&
        this.jobEducationData.jobType.toLowerCase() == "staf rumah tangga"
      ) {
        this.jobFields = this.defaultJobField.filter(
          x => x == "Staf Rumah Tangga"
        );
      } else {
        this.jobFields = this.defaultJobField;
      }
      if (
        this.jobEducationData.jobType &&
        (this.jobEducationData.jobType.toLowerCase() == "staf rumah tangga" ||
          this.jobEducationData.jobType.toLowerCase() == "ibu rumah tangga" ||
          this.jobEducationData.jobType.toLowerCase() == "mahasiswa" ||
          this.jobEducationData.jobType.toLowerCase() == "tidak bekerja")
      ) {
        delete this.jobEducationData.jobField;
        delete this.jobEducationData.job;
        delete this.jobEducationData.companyName;
        delete this.jobEducationData.companyNo;
        delete this.jobEducationData.startWorkingDateformated;
        delete this.jobEducationData.startWorkingDate;
        delete this.jobEducationData.payrollDate;
      }
    },
    filterjob: function() {
      this.jobs = this.jobNField
        .filter(x => x.field === this.jobEducationData.jobField)
        .map(x => x.job);
      this.jobEducationData.job = "";
    },
    selectMajor: function() {
      this.majors = this.majorsNHead
        .filter(x => x.head === this.jobEducationData.majorsHead)
        .map(x => x.name);
      this.jobEducationData.majors = "";

      this.$refs.ddMajor.activateMenu();
      this.$refs.ddMajor.onClick();
      this.$refs.ddMajor.onFocus();
    },
    resetMajor: function() {
      this.jobEducationData.majors = "";
      this.jobEducationData.majorsHead = "";
      this.$refs.ddMajorHead.onClick();
    },
    checkEmpty: function(data) {
      if (!data) {
        return true;
      }
      return false;
    },
    lower: function(data) {
      return data.toLowerCase();
    },
    checkPhoneNumber: function(field, value) {
      if (!this.jobEducationData[value]) {
        return;
      }
      const i = this.errors.items.findIndex(
        x =>
          x.field === `jobEducationDataForm.${field}` &&
          x.scope === "jobEducationDataForm" &&
          x.msg === `${field} tidak valid`
      );
      const check = checkPhone(this.jobEducationData[value]);
      if (!check && i === -1) {
        this.errors.add({
          scope: "jobEducationDataForm",
          field: `jobEducationDataForm.${field}`,
          msg: `${field} tidak valid`
        });
      } else if (check) {
        this.errors.items.splice(i, 1);
      }
    },
    selectNoDataCompanyName: function() {
      let i = this.companies.length;
      if (this.hasAddcompanyName) {
        i--;
      }
      this.$set(this.companies, i, this.jobEducationData.companiesSearch);
      this.jobEducationData.companyName = this.companies[i];
      this.hasAddcompanyName = true;
    },
    selectNoDatacollege: function() {
      let i = this.colleges.length;
      if (this.hasAddcollege) {
        i--;
      }
      this.$set(this.colleges, i, this.jobEducationData.collegeSearch);
      this.jobEducationData.college = this.colleges[i];
      this.hasAddcollege = true;
    },
    inputNavlog: function(e) {
      this.$navlog.inputKey(e, this.$route.name);
    }
  },
  async mounted() {
    this.$emit("makeBgTransparent", false);
    this.$emit("makeisSubPage", {
      text: "Pekerjaan & Pendidikan",
      url: "formhead"
    });

    if (localStorage.form3) {
      this.jobEducationData = JSON.parse(localStorage.form3);
    } //else {
    //   if (this.jobEducationData.netMonthlyIncome.length < 3) {
    //     this.jobEducationData.netMonthlyIncome = [];
    //     for (var i = 1; i <= 3; i++) {
    //       this.jobEducationData.netMonthlyIncome.push({
    //         text: parseInt(thisYear) - i,
    //         value: 0
    //       });
    //     }
    //   }
    // }

    //get dropdown
    const dropdownList = await this.dropdown();
    this.companies = dropdownList.companies;
    this.educations = dropdownList.last_educations;
    this.jobTypes = dropdownList.job_types;

    //job
    this.jobNField = dropdownList.job.map(x => {
      const arr = x.split(",");
      //add to jobfields
      const checkJobFields = this.jobFields.indexOf(arr[0]);
      if (checkJobFields == -1) {
        this.jobFields.push(arr[0]);
      }
      return { field: arr[0], job: arr[1] };
    });
    this.defaultJobField = [...this.jobFields];

    //colleges

    this.colleges = dropdownList.college.map(x => {
      const arr = x.split(",");
      return arr[1];
    });
    const checkCollegeExist = this.colleges.reduce((acc, c) => {
      return acc || c == this.jobEducationData.college;
    }, false);
    if (!checkCollegeExist) {
      this.colleges.push(this.jobEducationData.college);
    }

    //majors
    this.majorsNHead = dropdownList.majors.map(x => {
      const arr = x.split(",");
      //add to jobfields
      const checkmajorsHead = this.majorsHead.indexOf(arr[0]);
      if (checkmajorsHead == -1) {
        this.majorsHead.push(arr[0]);
      }
      return { head: arr[0], name: arr[1] };
    });

    //map with current data
    if (this.jobEducationData.majors) {
      this.majors = [this.jobEducationData.majors];
    }
    if (this.jobEducationData.jobField) {
      this.jobs = this.jobNField
        .filter(x => x.field === this.jobEducationData.jobField)
        .map(x => x.job);
    }
    this.clonedjobEducationData = { ...this.jobEducationData };
    this.doneMounted = true;
    //validate
    if (localStorage.form3Valid == 2) {
      await this.$validator.validateAll("jobEducationDataForm");
      if (
        !this.jobEducationData.jobType ||
        this.jobEducationData.jobType == ""
      ) {
        this.errorJobType = true;
      }
    }
  },
  watch: {
    ["jobEducationData.startWorkingDate"](val) {
      this.jobEducationData.startWorkingDateformated = formatDate(val);
      this.errors.items = deleteErrorBag(
        "mulai pekerjaan",
        "jobEducationDataForm",
        this.errors.items
      );
    },
    menustartWorkingDate(val) {
      if (val) {
        const label = this.$navlog.getConstantByKey("startWorkingDate");
        const action = `DatePicker : "${label}" clicked`;
        const obj = this.$navlog.mappingObj(this.$route.name, action);
        this.$navlog.save(obj);
      }
    },
    jobEducationData: {
      handler: function(val) {
        if (this.doneMounted) {
          let key = "",
            value = "";
          for (let i in val) {
            if (val[i] != this.clonedjobEducationData[i]) {
              key = i;
              value = val[i];
              break;
            }
          }
          if (key == "collegeSearch") {
            this.checkValidNamePaste(key, val[key]);
          }
          if (!key || !value) {
            return;
          }
          //companiesSearch: "a"
          //jobType: "Pekerja rumah tangga"
          //filter type
          const action = this.$navlog.filterTypeByKey(key, value);
          const obj = this.$navlog.mappingObj(this.$route.name, action);
          this.$navlog.save(obj);
          //last step
          this.clonedjobEducationData = { ...val };
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
  margin-top: 30px;
  margin-bottom: 20px;
  font-size: 14px;
}
</style>
