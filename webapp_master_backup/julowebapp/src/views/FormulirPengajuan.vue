<template>
  <div>
    <div class="textHeader">Formulir Pengajuan</div>
    <v-stepper v-model="stepper" alt-labels>
      <v-stepper-header class="header">
        <v-stepper-step :complete="stepper > 1" step="1">Data Pribadi</v-stepper-step>
        <v-divider></v-divider>
        <v-stepper-step :complete="stepper > 2" step="2">Data Keuangan</v-stepper-step>
        <v-divider></v-divider>
        <v-stepper-step step="3">Data Pendukung</v-stepper-step>
      </v-stepper-header>

      <v-stepper-items>
        <v-stepper-content step="1">
          <v-container grid-list-xl>
            <v-layout row>
              <v-flex xs12 sm8 md6 offset-xs0 offset-sm2 offset-md3>
                <div class="center">
                  <span class="titleBlock">Silahkan isi seluruh formulir di bawah ini</span>

                  <form data-vv-scope="personalDataForm">
                    <span class="divBlock" id="identitas">Identitas</span>
                    
                    <label class="labelInput">Nama Lengkap</label>
                    <v-text-field
                      autofocus
                      outline
                      data-vv-delay="300"
                      v-validate="'required'"
                      v-model="personalData.name"
                      :error-messages="errors.collect('name')"
                      placeholder="Nama Lengkap"
                      data-vv-name="name"
                      required
                    ></v-text-field>
                    <div class="errorInput">
                      <span>{{ errors.first("personalDataForm.name") }}</span>
                    </div>

                    <v-layout>
                      <v-flex xs6 class="smallPadding">
                        <label>Tanggal Lahir</label>
                        <v-menu
                          ref="menuDob"
                          :close-on-content-click="false"
                          v-model="menuDob"
                          :return-value.sync="dob"
                          lazy
                          transition="scale-transition"
                          offset-y
                          full-width
                          min-width="290px"
                        >
                          <v-text-field
                            outline
                            slot="activator"
                            v-model="personalData.dob"
                            append-icon="event"
                            readonly
                            v-validate="'required'"
                            :error-messages="errors.collect('dob')"
                            placeholder="DD/MM/YYYY"
                            data-vv-name="dob"
                            required
                          ></v-text-field>
                          <v-date-picker
                            v-model="personalData.dob"
                            @input="$refs.menuDob.save(dob)"
                          ></v-date-picker>
                        </v-menu>
                      </v-flex>
                      <v-flex xs1></v-flex>
                      <v-flex xs5 class="smallPadding">
                        <label>Jenis Kelamin</label>
                        <v-radio-group row v-model="personalData.sex">
                          <v-radio color="primary" label="Pria" value="1"></v-radio>
                          <v-radio color="primary" label="Wanita" value="2"></v-radio>
                        </v-radio-group>
                      </v-flex>
                    </v-layout>

                    <label class="labelInput">Nomor HP</label>
                    <v-text-field
                      outline
                      v-validate="'required|numeric'"
                      v-model="personalData.hpnum"
                      :error-messages="errors.collect('hpnum')"
                      placeholder="Nomor HP"
                      data-vv-name="hpnum"
                      required
                    ></v-text-field>
                    <div class="errorInput">
                      <span>{{ errors.first("personalDataForm.hpnum") }}</span>
                    </div>

                    <label class="labelInput">Tipe Pekerjaan</label>
                    <j-select
                      :items="jobTypes"
                      placeholder="Tipe Pekerjaan"
                      v-model="personalData.jobType"
                      outline
                      v-validate="'required'"
                      :error-messages="errors.collect('jobType')"
                      data-vv-name="jobType"
                      required
                    ></j-select>
                    <div class="errorInput">
                      <span>{{ errors.first("personalDataForm.jobType") }}</span>
                    </div>

                    <label class="labelInput">Bidang Pekerjaan</label>
                    <j-select
                      :items="jobFields"
                      placeholder="Bidang Pekerjaan"
                      v-model="personalData.jobField"
                      outline
                      v-validate="'required'"
                      :error-messages="errors.collect('jobField')"
                      data-vv-name="jobField"
                      required
                      @change="filterjob"
                    ></j-select>
                    <div class="errorInput">
                      <span>{{ errors.first("personalDataForm.jobField") }}</span>
                    </div>

                    <label class="labelInput">Pekerjaan</label>
                    <j-select
                      :items="jobs"
                      placeholder="Pekerjaan"
                      v-model="personalData.job"
                      outline
                      v-validate="'required'"
                      :error-messages="errors.collect('jobs')"
                      data-vv-name="jobs"
                      required
                    ></j-select>
                    <div class="errorInput">
                      <span>{{ errors.first("personalDataForm.jobs") }}</span>
                    </div>

                    <div class="buttonNext">
                      <v-divider></v-divider>
                    </div>

                    <!--Biodata-->
                    <span class="divBlock" id="biodata">Biodata</span>
                    
                    <label class="labelInput">Nomor HP Pribadi lainnya</label>
                    <v-text-field
                      outline
                      v-model="personalData.hpnum2"
                      v-validate="'numeric'"
                      :error-messages="errors.collect('hpnum2')"
                      placeholder="Nomor HP"
                      data-vv-name="hpnum2"
                    ></v-text-field>

                    <label class="labelInput">Alamat Tempat tinggal</label>
                    <v-layout wrap>
                      <v-flex xs12 class="smallPadding">
                        <v-text-field outline v-model="personalData.alamat" placeholder="Alamat"></v-text-field>
                      </v-flex>
                      <v-flex xs6 class="smallPadding">
                        <j-select
                          :items="provinces"
                          placeholder="Provinsi"
                          v-model="personalData.province"
                          outline
                          v-validate="'required'"
                          :error-messages="errors.collect('province')"
                          data-vv-name="province"
                          required
                          @change="filterRegency"
                        ></j-select>
                      </v-flex>
                      <v-flex xs6 class="smallPadding">
                        <j-select
                          :items="regencies"
                          placeholder="Kabupaten"
                          v-model="personalData.regency"
                          outline
                          v-validate="'required'"
                          :error-messages="errors.collect('regency')"
                          data-vv-name="regency"
                          required
                          @change="filterVillage"
                        ></j-select>
                      </v-flex>
                      <v-flex xs6 class="smallPadding">
                        <j-select
                          :items="subdistricts"
                          placeholder="Kelurahan"
                          v-model="personalData.subdistrict"
                          outline
                          v-validate="'required'"
                          :error-messages="errors.collect('subdistrict')"
                          data-vv-name="subdistrict"
                          required
                          @change="filterPostalcode"
                        ></j-select>
                      </v-flex>
                      <v-flex xs6 class="smallPadding">
                        <j-select
                          :items="villages"
                          placeholder="Kecamatan"
                          v-model="personalData.village"
                          outline
                          v-validate="'required'"
                          :error-messages="errors.collect('village')"
                          data-vv-name="village"
                          required
                          @change="filterSubdistrict"
                        ></j-select>
                      </v-flex>
                      <v-flex xs12 class="smallPadding">
                        <v-text-field
                          outline
                          v-model="personalData.postalcode"
                          placeholder="Kode Pos"
                          readonly
                        ></v-text-field>
                      </v-flex>
                      <v-flex xs6 class="smallPadding">
                        <label class="labelInput">Ditempat sejak</label>
                        <v-menu
                          ref="menuOccupiedSince"
                          :close-on-content-click="false"
                          v-model="menuOccupiedSince"
                          :return-value.sync="occupiedSince"
                          lazy
                          transition="scale-transition"
                          offset-y
                          full-width
                          min-width="290px"
                        >
                          <v-text-field
                            outline
                            slot="activator"
                            v-model="personalData.occupiedSince"
                            append-icon="event"
                            readonly
                            v-validate="'required'"
                            :error-messages="errors.collect('occupiedSince')"
                            placeholder="DD/MM/YYYY"
                            data-vv-name="occupiedSince"
                            required
                          ></v-text-field>
                          <v-date-picker
                            :min="personalData.dob"
                            :max="moment().format('YYYY-MM-DD')"
                            v-model="personalData.occupiedSince"
                            @input="$refs.menuOccupiedSince.save(occupiedSince)"
                          ></v-date-picker>
                        </v-menu>
                      </v-flex>
                      <v-flex xs6 class="smallPadding">
                        <label class="labelInput">Status domisili</label>
                        <j-select
                          :items="domicileStatus"
                          placeholder="Status domisili"
                          v-model="personalData.domicileStatus"
                          outline
                          v-validate="'required'"
                          :error-messages="errors.collect('domicileStatus')"
                          data-vv-name="domicileStatus"
                          required
                        ></j-select>
                      </v-flex>
                      <v-flex xs6 class="smallPadding">
                        <label class="labelInput">Status sipil</label>
                        <j-select
                          :items="civilStatus"
                          placeholder="Status domisili"
                          v-model="personalData.civilStatus"
                          outline
                          v-validate="'required'"
                          :error-messages="errors.collect('civilStatus')"
                          data-vv-name="civilStatus"
                          required
                        ></j-select>
                      </v-flex>
                      <v-flex xs6 class="smallPadding">
                        <label class="labelInput">Jumlah tanggungan</label>
                        <j-select
                          :items="dependencyNum"
                          placeholder="Jumlah tanggungan"
                          v-model="personalData.dependencyNum"
                          outline
                          v-validate="'required'"
                          :error-messages="errors.collect('dependencyNum')"
                          data-vv-name="dependencyNum"
                          required
                        ></j-select>
                      </v-flex>
                    </v-layout>
                  </form>
                </div>
              </v-flex>
            </v-layout>
          </v-container>
        </v-stepper-content>

        <v-stepper-content step="2">
          <v-container grid-list-xl>
            <v-layout row>
              <v-flex xs12 sm8 md6 offset-xs0 offset-sm2 offset-md3>
                <div class="center">
                  <span class="titleBlock">Isilah dengan teliti</span>
                  <form data-vv-scope="financialDataForm">
                    <!--Penghasilan-->
                    <span class="divBlock" id="penghasilan">Penghasilan</span>
                    
                    <label class="labelInput">Total penghasilan bersih per Bulan</label>
                    <table style="width: 100%">
                      <tr>
                        <td style="width: 1%">Rp.</td>
                        <td>
                          <v-text-field
                            autofocus
                            outline
                            data-vv-delay="300"
                            type="text"
                            placeholder="Total penghasilan bersih per Bulan"
                            v-model="financialData.totalMonthlyIncome"
                            v-validate="'required|numeric'"
                            :error-messages="errors.collect('Total penghasilan bersih per Bulan')"
                            data-vv-name="Total penghasilan bersih per Bulan"
                            required
                            style="width: 98%"
                          ></v-text-field>
                        </td>
                        <td style="width: 1%">,-</td>
                      </tr>
                    </table>
                    <div class="errorInput">
                      <span>{{ errors.first(`financialDataForm.${'Total penghasilan bersih per Bulan'}`) }}</span>
                    </div>

                    <label class="labelInput">Verifikasi Internet Banking</label>
                    <j-btn block outline color="#00B0F0" @click="bankVerificationDialog=true">
                      <v-layout row>
                        <v-flex xs3></v-flex>
                        <v-flex xs6>Verifikasi</v-flex>
                        <v-flex xs3>
                          <v-icon right dark v-if="financialData.verification">done</v-icon>
                        </v-flex>
                      </v-layout>

                      <!-- <v-spacer></v-spacer> -->
                    </j-btn>
                    <!--Penghasilan-->
                    <div class="buttonNext">
                      <v-divider></v-divider>
                    </div>

                    <!--Pengeluaran-->
                    <span class="divBlock" id="pengeluaran">Pengeluaran</span>
                    
                    <label class="labelInput">
                      Total pengeluaran bersih bulanan
                      <span
                        style="font-size:11px"
                      >(diluar cicilan dan sewa)</span>
                    </label>
                    <table style="width: 100%">
                      <tr>
                        <td style="width: 1%">Rp.</td>
                        <td>
                          <v-text-field
                            outline
                            data-vv-delay="300"
                            type="text"
                            placeholder="Total pengeluaran bersih bulanan"
                            v-model="financialData.totalMonthlySpending"
                            v-validate="'required|numeric'"
                            :error-messages="errors.collect('Total pengeluaran bersih bulanan')"
                            data-vv-name="Total pengeluaran bersih bulanan"
                            @change="countTotalSpending"
                            required
                            style="width: 98%"
                          ></v-text-field>
                        </td>
                        <td style="width: 1%">,-</td>
                      </tr>
                    </table>
                    <div class="errorInput">
                      <span>{{ errors.first(`financialDataForm.${'Total pengeluaran bersih bulanan'}`) }}</span>
                    </div>

                    <label class="labelInput">Total cicilan/sewa rumah per Bulan</label>
                    <table style="width: 100%">
                      <tr>
                        <td style="width: 1%">Rp.</td>
                        <td>
                          <v-text-field
                            outline
                            data-vv-delay="300"
                            type="text"
                            placeholder="Total cicilan/sewa rumah per Bulan"
                            v-model="financialData.totalHouseRentPerMonth"
                            v-validate="'required|numeric'"
                            :error-messages="errors.collect('Total cicilan sewa rumah per Bulan')"
                            data-vv-name="Total cicilan sewa rumah per Bulan"
                            @change="countTotalSpending"
                            required
                            style="width: 98%"
                          ></v-text-field>
                        </td>
                        <td style="width: 1%">,-</td>
                      </tr>
                    </table>
                    <div class="errorInput">
                      <span>{{ errors.first(`financialDataForm.${'Total cicilan sewa rumah per Bulan'}`) }}</span>
                    </div>

                    <label class="labelInput">Total cicilan hutang per bulan</label>
                    <table style="width: 100%">
                      <tr>
                        <td style="width: 1%">Rp.</td>
                        <td>
                          <v-text-field
                            outline
                            data-vv-delay="300"
                            type="text"
                            placeholder="Total cicilan hutang per bulan"
                            v-model="financialData.totalMonthlyDebt"
                            v-validate="'required|numeric'"
                            :error-messages="errors.collect('Total cicilan hutang per bulan')"
                            data-vv-name="Total cicilan hutang per bulan"
                            @change="countTotalSpending"
                            required
                            style="width: 98%"
                          ></v-text-field>
                        </td>
                        <td style="width: 1%">,-</td>
                      </tr>
                    </table>
                    <div class="errorInput">
                      <span>{{ errors.first(`financialDataForm.${'Total cicilan hutang per bulan'}`) }}</span>
                    </div>

                    <label class="labelInput">Total pengeluaran akumulatif per Bulan</label>
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
                    </table>
                    <!--Pengeluaran-->
                    <div class="buttonNext">
                      <v-divider></v-divider>
                    </div>

                    <!--Aset-->
                    <span class="divBlock" id="aset">Aset</span>

                    <v-layout>
                      <v-flex xs6 class="smallPadding">
                        <label class="labelInput">Kendaraan pribadi</label>
                        <j-select
                          :items="vehicles"
                          placeholder="Kendaraan pribadi"
                          v-model="financialData.vehicle"
                          outline
                          v-validate="'required'"
                          :error-messages="errors.collect('Kendaraan pribadi')"
                          data-vv-name="Kendaraan pribadi"
                          required
                        ></j-select>
                        <div class="errorInput">
                          <span>{{ errors.first(`financialDataForm${'Kendaraan pribadi'}`) }}</span>
                        </div>
                      </v-flex>
                      <v-flex xs6 class="smallPadding">
                        <label class="labelInput">Kepemilikan</label>
                        <j-select
                          :items="ownerships"
                          placeholder="Kepemilikan"
                          v-model="financialData.ownership"
                          outline
                          v-validate="'required'"
                          :error-messages="errors.collect('Kepemilikan')"
                          data-vv-name="Kepemilikan"
                          required
                        ></j-select>
                        <div class="errorInput">
                          <span>{{ errors.first(`financialDataForm${'Kepemilikan'}`) }}</span>
                        </div>
                      </v-flex>
                    </v-layout>
                    <!--Aset-->
                    <div class="buttonNext">
                      <v-divider></v-divider>
                    </div>

                    <!--Perbankan-->
                    <span class="divBlock" id="perbankan">Perbankan</span>
                    
                    <label class="labelInput">
                      Nama bank rekening pribadi
                      <span
                        style="font-size:11px"
                      >(untuk transfer dana JULO)</span>
                    </label>
                    <j-select
                      :items="bank"
                      placeholder="Nama Bank"
                      v-model="financialData.bankName"
                      outline
                      v-validate="'required'"
                      :error-messages="errors.collect('Nama Bank')"
                      data-vv-name="Nama Bank"
                      required
                    ></j-select>
                    <div class="errorInput">
                      <span>{{ errors.first(`financialDataForm${'Nama Bank'}`) }}</span>
                    </div>

                    <label class="labelInput">Cabang Bank</label>
                    <v-text-field
                      outline
                      placeholder="Cabang Bank"
                      v-model="financialData.bankBranch"
                      data-vv-delay="300"
                      v-validate="'required'"
                      :error-messages="errors.collect('Cabang Bank')"
                      data-vv-name="Cabang Bank"
                      required
                    ></v-text-field>
                    <div class="errorInput">
                      <span>{{ errors.first(`financialDataForm.${'Cabang Bank'}`) }}</span>
                    </div>

                    <label class="labelInput">
                      Nomor Rekening Pribadi
                      <span style="font-size:11px">(harus atas nama pemohon)</span>
                    </label>
                    <v-text-field
                      outline
                      placeholder="Nomor Rekening"
                      v-model="financialData.accNum"
                      data-vv-delay="300"
                      v-validate="'required'"
                      :error-messages="errors.collect('Nomor Rekening')"
                      data-vv-name="Nomor Rekening"
                      required
                    ></v-text-field>
                    <div class="errorInput">
                      <span>{{ errors.first(`financialDataForm.${'Nomor Rekening'}`) }}</span>
                    </div>

                    <label class="labelInput">
                      Nama pada Rekening Pribadi
                      <span
                        style="font-size:11px"
                      >(harus atas nama pemohon)</span>
                    </label>
                    <v-text-field
                      outline
                      placeholder="Nama pada Rekening"
                      v-model="financialData.accName"
                      data-vv-delay="300"
                      v-validate="'required'"
                      :error-messages="errors.collect('Nama pada Rekening')"
                      data-vv-name="Nama pada Rekening"
                      required
                    ></v-text-field>
                    <div class="errorInput">
                      <span>{{ errors.first(`financialDataForm.${'Nama pada Rekening'}`) }}</span>
                    </div>
                    <!--Perbankan-->
                  </form>
                </div>
              </v-flex>
            </v-layout>
          </v-container>
        </v-stepper-content>

        <v-stepper-content step="3">
          <v-container grid-list-xl>
            <v-layout row>
              <v-flex xs12 sm8 md6 offset-xs0 offset-sm2 offset-md3>
                <div class="center">
                  <span class="titleBlock">Ayo tinggal sedikit lagi!</span>
                  <form data-vv-scope="supportingDataForm">
                    <!--Informasi Keluarga-->
                    <span class="divBlock" id="informasiKeluarga">Informasi Keluarga</span>

                    <div v-if="personalData.civilStatus == 'married'">
                      <label class="labelInput">Nama pasangan</label>
                      <v-text-field
                        autofocus
                        outline
                        placeholder="Nama pasangan"
                        v-model="supportingData.spouseName"
                        data-vv-delay="300"
                        v-validate="'required'"
                        :error-messages="errors.collect('Nama pasangan')"
                        data-vv-name="Nama pasangan"
                        required
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
                            v-validate="'required'"
                            :error-messages="errors.collect('Nomor HP Pasangan')"
                            data-vv-name="Nomor HP Pasangan"
                            required
                          ></v-text-field>
                          <div class="errorInput">
                            <span>{{ errors.first(`supportingDataForm.${'Nomor HP Pasangan'}`) }}</span>
                          </div>
                        </v-flex>
                        <v-flex xs6 class="smallPadding">
                          <label>Tanggal lahir pasangan</label>
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
                              v-model="supportingData.dobSpouse"
                              append-icon="event"
                              readonly
                              v-validate="'required'"
                              :error-messages="errors.collect('Tanggal lahir pasangan')"
                              placeholder="DD/MM/YYYY"
                              data-vv-name="Tanggal lahir pasangan"
                              required
                            ></v-text-field>
                            <v-date-picker
                              v-model="supportingData.dobSpouse"
                              @input="$refs.menuDobSpouse.save(dobSpouse)"
                            ></v-date-picker>
                          </v-menu>
                          <div class="errorInput">
                            <span>{{ errors.first(`supportingDataForm${'Tanggal lahir pasangan'}`) }}</span>
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
                        v-validate="'required|min:10'"
                        :error-messages="errors.collect('Nomor HP Orang Tua')"
                        data-vv-name="Nomor HP Orang Tua"
                        required
                      ></v-text-field>
                      <div class="errorInput">
                        <span>{{ errors.first(`supportingDataForm.${'Nomor HP Orang Tua'}`) }}</span>
                      </div>
                    </div>

                    <label class="labelInput">Nama keluarga kandung</label>
                    <v-text-field
                      outline
                      placeholder="Nama keluarga kandung"
                      v-model="supportingData.nameOfKin"
                      data-vv-delay="300"
                      v-validate="'required'"
                      :error-messages="errors.collect('Nama keluarga kandung')"
                      data-vv-name="Nama keluarga kandung"
                      required
                    ></v-text-field>
                    <div class="errorInput">
                      <span>{{ errors.first(`supportingDataForm.${'Nama keluarga kandung'}`) }}</span>
                    </div>

                    <v-layout>
                      <v-flex xs6 class="smallPadding">
                        <label class="labelInput">Nomor HP keluarga kandung</label>
                        <v-text-field
                          outline
                          placeholder="Nomor HP keluarga kandung"
                          v-model="supportingData.kinNo"
                          data-vv-delay="300"
                          v-validate="'required|min:10'"
                          :error-messages="errors.collect('Nomor HP keluarga kandung')"
                          data-vv-name="Nomor HP keluarga kandung"
                          required
                        ></v-text-field>
                        <div class="errorInput">
                          <span>{{ errors.first(`supportingDataForm.${'Nomor HP keluarga kandung'}`) }}</span>
                        </div>
                      </v-flex>
                      <v-flex xs6 class="smallPadding">
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
                        ></j-select>
                        <div class="errorInput">
                          <span>{{ errors.first(`supportingDataForm${'Hubungan'}`) }}</span>
                        </div>
                      </v-flex>
                    </v-layout>
                    <!--Informasi Keluarga-->
                    <div class="buttonNext">
                      <v-divider></v-divider>
                    </div>

                    <!--Pekerjaan & Pendidikan-->
                    <span class="divBlock" id="pekerjaanPendidikan">Pekerjaan & Pendidikan</span>
                    
                    <label class="labelInput">Nama Perusahaan</label>
                    <j-select
                      :items="companies"
                      placeholder="Nama Perusahaan"
                      v-model="supportingData.companyName"
                      outline
                      v-validate="'required'"
                      :error-messages="errors.collect('Nama Perusahaan')"
                      data-vv-name="Nama Perusahaan"
                      required
                    ></j-select>
                    <div class="errorInput">
                      <span>{{ errors.first(`supportingDataForm${'Nama Perusahaan'}`) }}</span>
                    </div>

                    <label class="labelInput">Nomor Telepon Perusahaan</label>
                    <v-text-field
                      outline
                      placeholder="Nomor Telepon Perusahaan"
                      v-model="supportingData.companyNo"
                      data-vv-delay="300"
                      v-validate="'required|min:10'"
                      :error-messages="errors.collect('Nomor Telepon Perusahaan')"
                      data-vv-name="Nomor Telepon Perusahaan"
                      required
                    ></v-text-field>
                    <div class="errorInput">
                      <span>{{ errors.first(`supportingDataForm.${'Nomor Telepon Perusahaan'}`) }}</span>
                    </div>

                    <v-layout wrap>
                      <v-flex xs6 class="smallPadding">
                        <label>Mulai pekerjaan</label>
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
                            v-model="supportingData.startWorkingDate"
                            append-icon="event"
                            readonly
                            v-validate="'required'"
                            :error-messages="errors.collect('Mulai pekerjaan')"
                            placeholder="DD/MM/YYYY"
                            data-vv-name="Mulai pekerjaan"
                            required
                          ></v-text-field>
                          <v-date-picker
                            v-model="supportingData.startWorkingDate"
                            @input="$refs.menustartWorkingDate.save(startWorkingDate)"
                          ></v-date-picker>
                        </v-menu>
                        <div class="errorInput">
                          <span>{{ errors.first(`supportingDataForm${'Mulai pekerjaan'}`) }}</span>
                        </div>
                      </v-flex>
                      <v-flex xs6 class="smallPadding">
                        <label class="labelInput">Tanggal gajian</label>
                        <v-text-field
                          outline
                          placeholder="Tanggal gajian"
                          v-model="supportingData.payrollDate"
                          data-vv-delay="300"
                          v-validate="'required|min_value:1|max_value:31'"
                          :error-messages="errors.collect('Tanggal gajian')"
                          data-vv-name="Tanggal gajian"
                          required
                        ></v-text-field>
                        <div class="errorInput">
                          <span>{{ errors.first(`supportingDataForm.${'Tanggal gajian'}`) }}</span>
                        </div>
                      </v-flex>
                      <v-flex
                        xs12
                        class="smallPadding"
                      >Penghasilan bersih rata-rata per Bulan, 3 tahun terakhir (tidak wajib)</v-flex>
                      <v-flex
                        xs6
                        class="smallPadding"
                        v-for="(net,i) in supportingData.netMonthlyIncome"
                        :key="i"
                      >
                        <label class="labelInput">{{net.text}}</label>
                        <v-text-field outline placeholder="Rp. 0,-" v-model="net.value"></v-text-field>
                      </v-flex>
                    </v-layout>

                    <label class="labelInput">Pendidikan terakhir</label>
                    <j-select
                      :items="educations"
                      placeholder="Pendidikan terakhir"
                      v-model="supportingData.lastEducation"
                      outline
                      v-validate="'required'"
                      :error-messages="errors.collect('Pendidikan terakhir')"
                      data-vv-name="Pendidikan terakhir"
                      required
                    ></j-select>
                    <div class="errorInput">
                      <span>{{ errors.first(`supportingDataForm${'Pendidikan terakhir'}`) }}</span>
                    </div>

                    <div
                      v-if="supportingData.lastEducation == 'Diploma' || supportingData.lastEducation == 'S1'|| supportingData.lastEducation == 'S2' || supportingData.lastEducation == 'S3'"
                    >
                      <label class="labelInput">Perguruan tinggi</label>
                      <j-select
                        ref="ddCollageArea"
                        v-show="!supportingData.collegeArea"
                        :items="collegeArea"
                        placeholder="Perguruan tinggi"
                        v-model="supportingData.collegeArea"
                        outline
                        v-validate="'required'"
                        :error-messages="errors.collect('Perguruan tinggi')"
                        data-vv-name="Perguruan tinggi"
                        required
                        @change="selectCollage"
                      ></j-select>
                      <j-select
                        ref="ddCollage"
                        v-show="supportingData.collegeArea && !supportingData.college"
                        :items="colleges"
                        placeholder="Perguruan tinggi"
                        v-model="supportingData.college"
                        outline
                        v-validate="'required'"
                        :error-messages="errors.collect('Perguruan tinggi')"
                        data-vv-name="Perguruan tinggi"
                        required
                      ></j-select>
                      <j-select
                        v-show="supportingData.college"
                        :items="colleges"
                        v-model="supportingData.college"
                        outline
                        readonly
                        @click:append="resetCollage"
                        @click.native.prevent="resetCollage"
                      ></j-select>
                      <div class="errorInput">
                        <span>{{ errors.first(`supportingDataForm${'Perguruan tinggi'}`) }}</span>
                      </div>

                      <label class="labelInput">Jurusan</label>
                      <j-select
                        :items="majors"
                        placeholder="Jurusan"
                        v-model="supportingData.major"
                        outline
                        v-validate="'required'"
                        :error-messages="errors.collect('Jurusan')"
                        data-vv-name="Jurusan"
                        required
                        ref="ddMajor"
                        @change="selectMajor"
                      ></j-select>
                      <div class="errorInput">
                        <span>{{ errors.first(`supportingDataForm${'Jurusan'}`) }}</span>
                      </div>

                      <label class="labelInput">IPK</label>
                      <v-text-field
                        outline
                        data-vv-delay="300"
                        type="text"
                        placeholder="IPK"
                        v-model="supportingData.gpa"
                        v-validate="'required|numeric'"
                        :error-messages="errors.collect('IPK')"
                        data-vv-name="IPK"
                        required
                      ></v-text-field>
                      <div class="errorInput">
                        <span>{{ errors.first(`supportingDataForm${'IPK'}`) }}</span>
                      </div>
                    </div>

                    <label class="labelInput">Tahun lulus</label>
                    <j-select
                      :items="graduationYears"
                      placeholder="Tahun lulus"
                      v-model="supportingData.graduationYear"
                      outline
                      v-validate="'required'"
                      :error-messages="errors.collect('Tahun lulus')"
                      data-vv-name="Tahun lulus"
                      required
                    ></j-select>
                    <div class="errorInput">
                      <span>{{ errors.first(`supportingDataForm${'Tahun lulus'}`) }}</span>
                    </div>
                    <!--Pekerjaan & Pendidikan-->
                    <div class="buttonNext">
                      <v-divider></v-divider>
                    </div>

                    <!--Informasi pinjaman-->
                    <span class="divBlock" id="informasiPinjaman">Informasi pinjaman</span>
                    
                    <label class="labelInput">Kategori tujuan pinjaman</label>
                    <j-select
                      :items="loanPurposeCategories"
                      placeholder="Kategori tujuan pinjaman"
                      v-model="supportingData.loanPurposeCategory"
                      outline
                      v-validate="'required'"
                      :error-messages="errors.collect('Kategori tujuan pinjaman')"
                      data-vv-name="Kategori tujuan pinjaman"
                      required
                    ></j-select>
                    <div class="errorInput">
                      <span>{{ errors.first(`supportingDataForm${'Kategori tujuan pinjaman'}`) }}</span>
                    </div>

                    <label class="labelInput">Jelaskan tujuan pinjaman</label>
                    <v-text-field
                      outline
                      type="text"
                      placeholder="Jelaskan tujuan pinjaman"
                      v-model="supportingData.loanPurposeDescription"
                      data-vv-delay="300"
                      v-validate="'required'"
                      :error-messages="errors.collect('Jelaskan tujuan pinjaman')"
                      data-vv-name="Jelaskan tujuan pinjaman"
                      required
                    ></v-text-field>
                    <div class="errorInput">
                      <span>{{ errors.first(`supportingDataForm${'Jelaskan tujuan pinjaman'}`) }}</span>
                    </div>

                    <label class="labelInput">Dari mana tahu JULO ?</label>
                    <j-select
                      :items="knowJULOfroms"
                      placeholder="Dari mana tahu JULO"
                      v-model="supportingData.knowJULOfrom"
                      outline
                      v-validate="'required'"
                      :error-messages="errors.collect('Dari mana tahu JULO')"
                      data-vv-name="Dari mana tahu JULO"
                      required
                    ></j-select>
                    <div class="errorInput">
                      <span>{{ errors.first(`supportingDataForm${'Dari mana tahu JULO'}`) }}</span>
                    </div>

                    <!--Informasi pinjaman-->
                    <div class="buttonNext">
                      <v-divider></v-divider>
                    </div>

                    <!--Finalisasi-->
                    <span class="divBlock" id="finalisasi">Finalisasi</span>
                    
                    <label>Apakah Anda menggunakan smartphone milik sendiri?</label>
                    <v-radio-group row v-model="supportingData.isOwnPhone">
                      <v-radio color="primary" label="Ya" value="true"></v-radio>
                      <v-radio color="primary" label="Tidak" value="false"></v-radio>
                    </v-radio-group>

                    <div style="display: block;font-size:16px;">
                      Masukkan kode
                      <em>referral</em> Anda!
                    </div>
                    <div style="display: block;">Lewati jika tidak ada</div>
                    <v-text-field
                      outline
                      type="text"
                      placeholder="Masukkan kode referral Anda"
                      v-model="supportingData.referralCode"
                    ></v-text-field>
                    <!--Finalisasi-->
                  </form>
                </div>
              </v-flex>
            </v-layout>
          </v-container>
        </v-stepper-content>

        <div class="buttonNext">
          <v-divider></v-divider>
          <div
            class="buttonNext"
            style="text-align:center"
          >Pastikan Seluruh data yang anda masukan benar.</div>
          <div class="center buttonNext" style="width:210px">
            <j-btn @click="backStep" style="width:40px" v-bind="{ ['disabled']: stepper==1 }">
              <v-icon>navigate_before</v-icon>
            </j-btn>
            <j-btn @click="nextStep" v-bind="{ ['disabled']: stepper==3 }">
              <v-icon>navigate_next</v-icon>
            </j-btn>
          </div>
        </div>
        <div class="center buttonNext" style="width:123px">
          <j-btn @click="saveData" color="primary" v-if="stepper == 3">Lanjutkan</j-btn>
        </div>
      </v-stepper-items>
    </v-stepper>

    <!--verification p1-->
    <v-layout row justify-center>
      <v-dialog v-model="bankVerificationDialog" persistent width="90%">
        <v-card>
          <v-card-actions class="grey lighten-4">
            <v-spacer></v-spacer>
            <j-btn icon @click.native="bankVerificationDialog = false">
              <v-icon>close</v-icon>
            </j-btn>
          </v-card-actions>
          <v-card-title class="grey lighten-4">
            <div
              class="buttonNext"
              style="text-align: center; color:rgba(0, 176, 240); font-weight: bold; font-size: 18px; width: 100%"
            >Verifikasi Bank</div>
            <div
              style="font-size: 14px;"
            >Untuk mendapatkan status kredit lebih, log in ke online banking pada bank utama Anda. Lewati jika Anda tidak punya)</div>
          </v-card-title>
          <v-card-text>
            <div>
              <div>
                <span style="color:red;">*</span>
                <span style="color:rgba(0, 176, 240);">Kebijakan Privasi</span>
              </div>
              <div>
                JULO
                <strong>tidak menyimpan User ID / PIN / Password</strong> akun Anda dan JULO
                <strong>tidak dapat mengendalikan akun</strong> Anda termasuk melakukan transaksi apapun. Akses hanya digunakan untuk memverifikasi data.
              </div>
            </div>

            <div class="buttonNext">
              <v-divider></v-divider>
            </div>

            <div>
              <v-container grid-list-xl>
                <v-layout wrap justify-center>
                  <v-flex xs12 sm8 md7 v-for="(bank) in bankVerificationBtn" :key="bank.id">
                    <j-btn
                      outline
                      color="#D3D3D3"
                      class="btnVerification"
                      @click="bankVerificationDialog2Open(bank)"
                      v-bind="{ ['disabled']: bank.tryCount==3 }"
                    >
                      <v-layout row>
                        <v-flex xs4 style="text-align: right !important; padding-top:17px;">
                          <img :src="bank.img" style="height:25px;max-width:100px;">
                        </v-flex>
                        <v-flex xs1>
                          <div style="text-align:center; padding-left:10px;">
                            <div class="verticalLine" style="height: 30px;"></div>
                          </div>
                        </v-flex>
                        <v-flex xs6 style="text-align: left !important; padding-top:17px;">
                          <span
                            style="text-transform: none; color: black; font-size:16px;"
                          >{{bank.text}}</span>
                        </v-flex>
                      </v-layout>
                    </j-btn>
                  </v-flex>
                </v-layout>
              </v-container>
            </div>
          </v-card-text>
        </v-card>
      </v-dialog>
    </v-layout>
    <!--verification p1-->
    <!--verification p2-->
    <v-layout row justify-center>
      <v-dialog v-model="bankVerificationDialog2" persistent width="90%">
        <v-card>
          <v-card-actions class="primary">
            <j-btn icon @click.native="bankVerificationDialogOpen">
              <v-icon>arrow_back</v-icon>
            </j-btn>
            <v-spacer></v-spacer>
            <j-btn icon @click.native="bankVerificationDialog2 = false">
              <v-icon>close</v-icon>
            </j-btn>
          </v-card-actions>
          <v-card-title class="primary">
            <div
              class="buttonNext"
              style="text-align: center; color:white; font-weight: bold; font-size: 18px; width: 100%"
            >Verifikasi Bank</div>
            <v-layout justify-center>
              <img src="../assets/Julo-logo-bank.png" style="height:100px;">
              <lottie
                :options="defaultOptions"
                :height="100"
                :width="100"
                v-on:animCreated="handleAnimation"
                style="margin-left:10px !important; margin-right:10px !important;"
              />
              <div style="padding-top:30px;">
                <img :src="currBank.img" style="height:35px; filter: brightness(0) invert(1);">
              </div>
            </v-layout>
          </v-card-title>
          <v-card-text>
            <div>
              <form data-vv-scope="bankVerification">
                <label class="labelInput">User ID</label>
                <v-text-field
                  autofocus
                  outline
                  placeholder="User ID"
                  v-model="bankVerification.userID"
                  data-vv-delay="300"
                  v-validate="'required'"
                  :error-messages="errors.collect('User ID')"
                  data-vv-name="User ID"
                  required
                ></v-text-field>
                <div class="errorInput">
                  <span>{{ errors.first(`bankVerification.${'User ID'}`) }}</span>
                </div>

                <label class="labelInput">Password / Pin</label>
                <v-text-field
                  outline
                  placeholder="Password / Pin"
                  :append-icon="showPassword ? 'visibility_off' : 'visibility'"
                  :type="showPassword ? 'text' : 'password'"
                  @click:append="showPassword = !showPassword"
                  v-model="bankVerification.pin"
                  data-vv-delay="300"
                  v-validate="'required'"
                  :error-messages="errors.collect('Pin')"
                  data-vv-name="Pin"
                  required
                ></v-text-field>
                <div class="errorInput">
                  <span>{{ errors.first(`bankVerification.${'Pin'}`) }}</span>
                </div>

                <j-btn color="info" @click="verifyBank">Login</j-btn>
              </form>
            </div>

            <div class="buttonNext">
              <v-divider></v-divider>
            </div>

            <div>
              JULO tidak menyimpan
              <strong>User ID / PIN / Password</strong> Internet Banking Anda. JULO menggunakan sistem koneksi terenkripsi untuk menjaga keamanan akun Anda. Privasi data Anda adalah prioritas utama kami.
            </div>
          </v-card-text>
        </v-card>
      </v-dialog>
    </v-layout>
    <!--verification p2-->
    <!--popup-->
    <v-layout row justify-center>
      <v-dialog v-model="popup" persistent width="290">
        <v-card>
          <v-card-actions>
            <v-layout wrap justify-center>
              <v-flex xs10>
                <img :src="bankVerificationRes.imgsrc" width="100%" style="display: block;">
              </v-flex>
              <v-flex xs12>
                <div
                  style="color:rgba(0, 176, 240); font-size:16px;  text-align:center;"
                >{{bankVerificationRes.title}}</div>
              </v-flex>
            </v-layout>
          </v-card-actions>
          <v-card-title primary-title style="text-align:center;">{{bankVerificationRes.text}}</v-card-title>

          <v-card-actions>
            <j-btn
              flat
              :color="bankVerificationRes.btnColor"
              @click="popup=false"
            >{{bankVerificationRes.btnText}}</j-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-layout>
    <!--popup-->
    <div class="text-xs-center">
      <v-dialog v-model="confirmLeavePage" width="400">
        <v-card>
          <v-card-title
            class="grey lighten-3"
            primary-title
            style="font-size: 16px;"
          >Apakah Anda ingin meninggalkan halaman ini ?</v-card-title>

          <v-card-text>Perubahan yang telah dilakukan tidak akan disimpan</v-card-text>

          <v-divider></v-divider>

          <v-card-actions>
            <v-spacer></v-spacer>
            <j-btn color="primary" flat @click="leavePageYes">Tinggalkan</j-btn>
            <j-btn color="primary" @click="confirmLeavePage=false">Tetap Di Sini</j-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import _ from "lodash";
import animationData from "../assets/lottie/animation.js";
import Lottie from "vue-lottie";
import moment from "moment";
import enums from "../enums";

const yImg = require("@/assets/il_centang.png");
const xImg = require("@/assets/exc_mark_red.png");
const thisYear = moment().format("YYYY");
export default {
  components: { Lottie },
  data() {
    return {
      ...mapState(["user"]),
      defaultOptions: {
        animationData: animationData,
        loop: true,
        autoplay: true
      },
      anim: "",
      verification: false,
      showPassword: false,
      stepper: 1,
      leavePage: false,
      leavePageTo: "",
      bankVerificationDialog: false,
      bankVerificationDialog2: false,
      confirmLeavePage: false,
      popup: false,
      jobTypes: [],
      jobNField: [],
      jobFields: [],
      jobs: [],
      villages: [],
      addresses: [],
      provinces: [],
      regencies: [],
      subdistricts: [],
      domicileStatus: [],
      relation: [],
      civilStatus: [],
      bank: [],
      ownerships: [],
      vehicles: [],
      educations: ["Diploma", "S1", "S2", "S3", "SD", "SMP", "SMA"],
      colleges: [],
      collegeArea: [],
      collegeNArea: [],
      majors: [],
      majorsNHead: [],
      majorsHead: [],
      graduationYears: _.range(1991, parseInt(thisYear) + 1),
      companies: [],
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
      currBank: {},
      bankVerificationBtn: enums.banklist,
      dependencyNum: _.range(10),
      personalData: {},
      financialData: {
        totalAccumulation: 0,
        totalMonthlyDebt: 0,
        totalHouseRentPerMonth: 0,
        totalMonthlySpending: 0
      },
      bankVerification: {},
      supportingData: { netMonthlyIncome: [] },
      imgbankVerification: [yImg, xImg],
      bankVerificationRes: {},
      menuDob: false,
      menuOccupiedSince: false,
      menustartWorkingDate: false,
      startWorkingDate: null,
      menuDobSpouse: false,
      dobSpouse: null,
      dob: null,
      occupiedSince: null,
      isSubmit: false,
      reviewHeaders: [
        {
          group: "Identitas",
          segment: "personalData",
          stepper: 1,
          items: [
            {
              type: "text",
              text: "Nama lengkap",
              value: "name"
            },
            {
              half: true,
              type: "date",
              text: "Tanggal lahir",
              value: "dob"
            },
            {
              half: true,
              type: "radio",
              text: "Jenis kelamin",
              value: "sex",
              dataSource: [
{ value: "1", text: "Pria" }, { value: "2", text: "Wanita" }
              ]
            },
            {
              type: "text",
              text: "Nomor HP",
              value: "hpnum"
            },
            {
              type: "select",
              text: "Tipe pekerjaan",
              value: "jobType"
            },
            {
              type: "select",
              text: "Bidang pekerjaan",
              value: "jobField"
            },
            {
              type: "select",
              text: "Pekerjaan",
              value: "job"
            }
          ]
        },
        {
          group: "Biodata",
          segment: "personalData",
          stepper: 1,
          items: [
            {
              type: "text",
              text: "Nomor HP Pribadi lainnya",
              value: "hpnum2"
            },
            {
              type: "text",
              text: "Alamat",
              value: "alamat"
            },
            {
              half: true,
              type: "select",
              text: "Provinsi",
              value: "province"
            },
            {
              half: true,
              type: "select",
              text: "Kabupaten",
              value: "regency"
            },
            {
              half: true,
              type: "select",
              text: "Kelurahan",
              value: "subdistrict"
            },
            {
              half: true,
              type: "select",
              text: "Kecamatan",
              value: "village"
            },
            {
              type: "text",
              text: "Kode Pos",
              value: "postalcode"
            },
            {
              half: true,
              type: "date",
              text: "Ditempat sejak",
              value: "occupiedSince"
            },
            {
              half: true,
              type: "select",
              text: "Status domisili",
              value: "domicileStatus"
            },
            {
              half: true,
              type: "select",
              text: "Status sipil",
              value: "civilStatus"
            },
            {
              half: true,
              type: "select",
              text: "Jumlah tanggungan",
              value: "dependencyNum"
            }
          ]
        },
        {
          group: "Penghasilan",
          segment: "financialData",
          stepper: 2,
          items: [
            {
              type: "currency",
              text: "Total penghasilan bersih per Bulan",
              value: "totalMonthlyIncome"
            },
            {
              type: "btnBank",
              text: "Verifikasi Internet Banking",
              value: "verification"
            }
          ]
        },
        {
          group: "Pengeluaran",
          segment: "financialData",
          stepper: 2,
          items: [
            {
              type: "currency",
              text: "Total penghasilan bersih per Bulan",
              value: "totalMonthlySpending"
            },
            {
              type: "currency",
              text: "Total cicilan/sewa rumah per Bulan",
              value: "totalHouseRentPerMonth"
            },
            {
              type: "currency",
              text: "Total cicilan hutang per bulan",
              value: "totalMonthlyDebt"
            },
            {
              type: "currency",
              text: "Total pengeluaran akumulatif per Bulan",
              value: "totalAccumulation"
            }
          ]
        },
        {
          group: "Aset",
          segment: "financialData",
          stepper: 2,
          items: [
            {
              type: "select",
              text: "Kendaraan pribadi",
              value: "vehicle"
            },
            {
              type: "select",
              text: "Kepemilikan",
              value: "ownership"
            }
          ]
        },
        {
          group: "Perbankan",
          segment: "financialData",
          stepper: 2,
          items: [
            {
              type: "select",
              text: "Nama bank rekening pribadi",
              value: "bankName"
            },
            {
              type: "text",
              text: "Cabang Bank",
              value: "bankBranch"
            },
            {
              type: "text",
              text: "Nomor Rekening",
              value: "accNum"
            },
            {
              type: "text",
              text: "Nama pada Rekening Pribadi",
              value: "accName"
            }
          ]
        },
        {
          group: "Informasi Keluarga",
          segment: "supportingData",
          stepper: 3,
          items: [
            {
              type: "text",
              text: "Nama keluarga kandung",
              value: "nameOfKin"
            },
            {
              half: true,
              type: "text",
              text: "Nomor HP keluarga kandung",
              value: "kinNo"
            },
            {
              half: true,
              type: "text",
              text: "Hubungan",
              value: "relation"
            }
          ]
        },
        {
          group: "Pekerjaan & Pendidikan",
          segment: "supportingData",
          stepper: 3,
          items: [
            {
              type: "text",
              text: "Nama Perusahaan",
              value: "companyName"
            },
            {
              type: "text",
              text: "Nomor Telepon Perusahaan",
              value: "companyNo"
            },
            {
              half: true,
              type: "date",
              text: "Mulai pekerjaan",
              value: "startWorkingDate"
            },
            {
              half: true,
              type: "text",
              text: "Tanggal gajian",
              value: "payrollDate"
            },
            {
              type: "select",
              text: "Pendidikan terakhir",
              value: "lastEducation"
            },

            {
              type: "select",
              text: "Tahun lulus",
              value: "graduationYear"
            }
          ]
        },
        {
          group: "Informasi pinjaman",
          segment: "supportingData",
          stepper: 3,
          items: [
            {
              type: "select",
              text: "Kategori tujuan pinjaman",
              value: "loanPurposeCategory"
            },
            {
              type: "text",
              text: "Jelaskan tujuan pinjaman",
              value: "loanPurposeDescription"
            },
            {
              type: "select",
              text: "Dari mana tahu JULO ?",
              value: "knowJULOfrom"
            }
          ]
        },
        {
          group: "Finalisasi",
          segment: "supportingData",
          stepper: 3,
          items: [
            {
              type: "radio",
              text: "Apakah Anda menggunakan smartphone milik sendiri?",
              value: "isOwnPhone",
              dataSource: [
                { value: "true", text: "Ya" },
                { value: "false", text: "Tidak" }
              ]
            },
            {
              type: "text",
              text: "Referral Code",
              value: "referralCode"
            }
          ]
        }
      ]
    };
  },
  methods: {
    ...mapActions(["bankverification", "dropdown"]),
    handleAnimation: function(anim) {
      this.anim = anim;
    },
    saveData: async function() {
      try {
        const valid1 = await this.$validator.validateAll("personalDataForm");
        const valid2 = await this.$validator.validateAll("financialDataForm");
        const valid3 = await this.$validator.validateAll("supportingDataForm");

        if (valid1 && valid2 && valid3) {
          //edit send to db
        }

        this.isSubmit = true;
        const data = _.pick(this, [
          "personalData",
          "financialData",
          "supportingData"
        ]);
        const rawData = { ...data };
        const headers = this.reviewHeaders;
        const infoKelI = headers.findIndex(x => {
          return x.group == "Informasi Keluarga";
        });
        const pendidikanI = headers.findIndex(x => {
          return x.group == "Pekerjaan & Pendidikan";
        });
        for (var i = 1; i <= 3; i++) {
          const year = parseInt(thisYear) - i;
          const newI = `netMonthlyIncome${year}`;
          const newVal = data.supportingData.netMonthlyIncome[i - 1].value;
          headers[pendidikanI].items.splice(3 + i, 0, {
            half: true,
            type: "text",
            text: year.toString(),
            value: newI
          });
          data.supportingData = { ...data.supportingData, [newI]: newVal };
        }
        if (this.personalData.civilStatus == "married") {
          headers[infoKelI].items.splice(
            0,
            0,
            {
              type: "text",
              text: "Nama pasangan",
              value: "spouseName"
            },
            {
              half: true,
              type: "text",
              text: "Nomor HP Pasangan",
              value: "spouseNo"
            },
            {
              half: true,
              type: "date",
              text: "Tanggal lahir pasangan",
              value: "dobSpouse"
            }
          );
        } else {
          headers[infoKelI].items.splice(
            0,
            0,
            {
              type: "text",
              text: "Nama Orang Tua",
              value: "parentsName"
            },
            {
              type: "text",
              text: "Nomor HP Orang Tua",
              value: "parentsNo"
            }
          );
        }
        if (
          this.supportingData.lastEducation == "Diploma" ||
          this.supportingData.lastEducation == "S1" ||
          this.supportingData.lastEducation == "S2" ||
          this.supportingData.lastEducation == "S3"
        ) {
          headers[pendidikanI].items.splice(
            8,
            0,
            {
              type: "select",
              text: "Perguruan tinggi",
              value: "college"
            },
            {
              type: "select",
              text: "Jurusan",
              value: "major"
            },
            {
              type: "text",
              text: "IPK",
              value: "gpa"
            }
          );
        }
        //save localstorage
        localStorage.form = JSON.stringify(rawData);

        //apus aja
        // localStorage.data = JSON.stringify(data);
        // localStorage.headers = JSON.stringify(headers);
        /////////

        this.$router.push({
          name: "reviewForm",
          params: {
            data,
            headers,
            rawData
          }
        });
      } catch (err) {}
    },
    countTotalSpending: function() {
      this.financialData.totalAccumulation =
        parseInt(this.financialData.totalMonthlyDebt) +
        parseInt(this.financialData.totalHouseRentPerMonth) +
        parseInt(this.financialData.totalMonthlySpending);
    },
    nextStep: async function() {
      let scopeForm = "";
      if (this.stepper == 1) {
        scopeForm = "personalDataForm";
      } else if (this.stepper == 2) {
        scopeForm = "financialDataForm";
      } else if (this.stepper == 3) {
        scopeForm = "supportingDataForm";
      }
      try {
        const valid = await this.$validator.validateAll(scopeForm);
        if (valid) {
        }
        this.stepper++;
        this.$vuetify.goTo(0, {
          duration: 300,
          offset: 0,
          easing: "easeInOutCubic"
        });
      } catch (err) {
        console.log(err);
      }
    },
    backStep: function() {
      this.stepper--;
      this.$vuetify.goTo(0, {
        duration: 300,
        offset: 0,
        easing: "easeInOutCubic"
      });
    },
    bankVerificationDialogOpen: function() {
      this.bankVerificationDialog = true;
      this.bankVerificationDialog2 = false;
    },
    bankVerificationDialog2Open: function(bank) {
      this.bankVerificationDialog = false;
      this.bankVerificationDialog2 = true;
      this.currBank = _.pick(bank, ["img", "text", "id"]);
    },
    verifyBank: async function() {
      //cek user login failed or success
      //console.log(this.bankVerification);
      this.bankVerification.bankcode = this.currBank.id;
      const valid = await this.bankverification(this.bankVerification);
      if (valid) {
        this.bankVerificationRes = {
          imgsrc: this.imgbankVerification[0],
          title: "Berhasil!",
          text: "Verifikasi Internet Banking Berhasil.",
          btnText: "Lanjutkan",
          btnColor: "primary"
        };
        const currentBankI = this.bankVerificationBtn.findIndex(data => {
          return data.id == this.currBank.id;
        });
        this.bankVerificationBtn[currentBankI].tryCount++;
        this.bankVerificationDialog2 = false;
        this.popup = true;
        this.financialData.verification = this.currBank.text;
      }
    },
    leavePageYes: function() {
      this.leavePage = true;
      const to = _.pick(this.leavePageTo, ["name", "params", "path", "query"]);
      this.$router.push(to);
    },
    confirmClosePage: function() {
      window.onbeforeunload = function() {
        return "Apakah Anda ingin meninggalkan halaman ini ? Perubahan yang telah dilakukan tidak akan disimpan";
      };
    },
    filterjob: function() {
      this.jobs = this.jobNField
        .filter(x => x.field === this.personalData.jobField)
        .map(x => x.job);
      this.personalData.job = "";
    },
    filterRegency: function() {
      this.regencies = this.addresses
        .filter(x => x.province === this.personalData.province)
        .map(x => x.regency);

      //reset other dropdown
      this.villages = [];
      this.subdistricts = [];
      //reset other selection
      this.personalData.postalcode = "";
    },
    filterVillage: function() {
      this.villages = this.addresses
        .filter(x => x.regency === this.personalData.regency)
        .map(x => x.village);

      //reset other dropdown
      this.subdistricts = [];
      //reset other selection
      this.personalData.postalcode = "";
    },
    filterSubdistrict: function() {
      this.subdistricts = this.addresses
        .filter(x => x.village === this.personalData.village)
        .map(x => x.subdistrict);

      //reset other selection
      this.personalData.postalcode = "";
    },
    filterPostalcode: function() {
      const postalcodes = this.addresses
        .filter(x => x.subdistrict === this.personalData.subdistrict)
        .map(x => x.postalcode);

      //reset other selection
      this.personalData.postalcode = postalcodes;
    },

    selectCollage: function() {
      this.colleges = this.collegeNArea
        .filter(x => x.area === this.supportingData.collegeArea)
        .map(x => x.name);
      this.supportingData.college = "";
      this.$refs.ddCollage.onClick();
    },
    resetCollage: function() {
      this.supportingData.college = "";
      this.supportingData.collegeArea = "";
      this.$refs.ddCollageArea.onClick();
    }
  },
  updated() {
    this.confirmClosePage();
  },
  beforeMount() {
    ////apus
    // this.bankVerification.userID = "faushang0209";
    // this.bankVerification.pin = "654321";
    ///
    if (this.$route.params) {
      if (this.$route.params.stepper) {
        this.stepper = this.$route.params.stepper;
      }

      if (this.$route.params.rawData) {
        const {
          personalData,
          financialData,
          supportingData
        } = this.$route.params.rawData;
        this.personalData = personalData;
        this.financialData = financialData;
        this.supportingData = supportingData;
      }
    }
    this.personalData.name = this.user.fullname;
  },
  async mounted() {
    //bank

    this.bankVerificationBtn.forEach(bank => {
      bank.img = require(`@/assets/${bank.src}`);
      bank.tryCount = 0;
    });

    for (var i = 1; i <= 3; i++) {
      if (this.supportingData.netMonthlyIncome.length < 3)
        this.supportingData.netMonthlyIncome.push({
          text: parseInt(thisYear) - i,
          value: 0
        });
    }

    if (localStorage.form) {
      const { personalData, financialData, supportingData } = JSON.parse(
        localStorage.form
      );
      this.personalData = personalData;
      this.financialData = financialData;
      this.supportingData = supportingData;
    }

    //get dropdown
    const dropdownList = await this.dropdown();
    this.bank = dropdownList.banks;

    this.companies = dropdownList.companies;
    this.languages = dropdownList.dialects;
    this.civilStatus = dropdownList.marital_statuses;
    this.domicileStatus = dropdownList.home_statuses;
    this.ownerships = dropdownList.vehicle_ownerships;
    this.vehicles = dropdownList.vehicle_types;
    this.educations = dropdownList.last_educations;
    this.jobTypes = dropdownList.job_types;
    this.loanPurposeCategories = dropdownList.loan_purposes;
    this.knowJULOfroms = dropdownList.marketing_sources;
    this.relation = dropdownList.kin_relationships;

    //job
    this.jobNField = dropdownList.jobs.map(x => {
      const arr = x.split(",");
      //add to jobfields
      const checkJobFields = this.jobFields.indexOf(arr[0]);
      if (checkJobFields == -1) {
        this.jobFields.push(arr[0]);
      }
      return { field: arr[0], job: arr[1] };
    });

    //colleges
    this.collegeNArea = dropdownList.colleges.map(x => {
      const arr = x.split(",");
      //add to jobfields
      const checkcollegeArea = this.collegeArea.indexOf(arr[0]);
      if (checkcollegeArea == -1) {
        this.collegeArea.push(arr[0]);
      }
      return { area: arr[0], name: arr[1] };
    });

    //majors
    this.majorsNHead = dropdownList.majors.map(x => {
      const arr = x.split(",");
      //add to jobfields
      const checkmajorsHead = this.majors.indexOf(arr[0]);
      if (checkmajorsHead == -1) {
        this.majors.push(arr[0]);
      }
      return { head: arr[0], name: arr[1] };
    });

    //address
    this.addresses = dropdownList.addresses.map(x => {
      const arr = x.split(",");
      //add to jobfields
      const checkprovinces = this.provinces.indexOf(arr[4]);
      if (checkprovinces == -1) {
        this.provinces.push(arr[4]);
      }
      return {
        postalcode: arr[0],
        subdistrict: arr[1],
        village: arr[2],
        regency: arr[3],
        province: arr[4]
      };
    });
    //adding dropdown if data exist
    if (this.personalData.province) {
      this.filterRegency();
    }
    if (this.personalData.regency) {
      this.filterVillage();
    }
    if (this.personalData.village) {
      this.filterSubdistrict();
    }
    if (this.personalData.subdistrict) {
      this.filterPostalcode();
    }
  },
  beforeRouteLeave(to, from, next) {
    if (this.isSubmit) {
      next(true);
    }
    this.confirmLeavePage = true;
    this.leavePageTo = to;
    next(this.leavePage);
  },
  created() {
    // window.addEventListener("beforeunload", event => {
    //   event.preventDefault();
    //   var confirmationMessage = "\o/";
    //   event.returnValue = confirmationMessage;
    //   return confirmationMessage;
    // });
  }
};
</script>

<style scoped>
.titleBlock {
  display: block;
  font-size: 16px;
  text-align: center;
  margin-bottom: 15px;
}
.divBlock {
  margin-top: 10px;
  display: block;
  font-weight: bold;
  margin-bottom: 10px;
}
.labelInput:hover:focus {
  color: rgba(61, 226, 255, 0.54);
}
.errorInput {
  color: red;
  font-size: 12px;
  height: 14px;
  margin-bottom: 5px;
}
.center {
  margin: auto;
}
.smallPadding {
  padding-top: 2px !important;
  padding-bottom: 2px !important;
}
.currencyPadding {
  padding: 0px !important;
}
.buttonNext {
  margin-top: 20px;
  margin-bottom: 20px;
}
.verticalLine {
  width: 2px;
  background-color: #d3d3d3;
  height: 100%;
  float: left;
}
.btnVerification {
  width: 100%;
  height: 60px;
}
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
      rgb(62, 99, 177, 0.7) 100%
    ),
    url("../assets/Header Image/Form.jpg") no-repeat center center;
  background-size: 100% auto;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
}
.textHeader {
  z-index: 1;
  color: white;
  width: 100%;
  padding-top: 110px;
  text-align: center;
  position: absolute;
  background-color: rgba(255, 255, 255, 0.001);
  font-size: 16px;
  font-weight: bold;
}
</style>
