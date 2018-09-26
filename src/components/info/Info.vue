<template>
  <div>
    <sidebar></sidebar>
    <v-content>
      <v-container>
        <v-layout>
          <v-flex xs12>
            <div class="display-1"><u>Info</u></div>
            <v-layout row wrap class="mt-3">
              <v-flex xs12>
                <div class="headline">Introduction</div>
              </v-flex>
            </v-layout>
            <v-layout row wrap>
              <v-flex xs12>
                <span>For anyone studying project data, it is imperative to understand how and why it has been collected and collated. This section will discuss the methodology and reasoning behind data collection. Please feel free to ask further questions via the forum pages, or contact the administrator if you require any further information on data collection.</span>
              </v-flex>
            </v-layout>
            <v-layout row wrap class="mt-2">
              <v-flex xs12>
                <v-expansion-panel popout>
                  <v-expansion-panel-content>
                    <div slot="header">Methodology</div>
                    <v-divider></v-divider>
                    <v-card>
                      <v-card-text>The data shown here is part of phase 1 of the HEED project. Phase 1 involves a series of activities to better understand the contexts within which the HEED project is working. These activities include field visits to the research sites, project meetings to better understand the interface between engineering and social policy interventions and training. Two, five-day research methods training programmes in Quantitative and Qualitative Methods for Research on Energy and Forced Displacement designed by all members of the project team to build research capacity around data collection and analysis. Recruitment of researchers coordinated through Practical Action and their relevant country networks reaching out to universities and third party organisations. A baseline survey conducted using the quantitative and qualitative research methods toolkits developed by Practical Action on energy in contexts of forced displacement. The survey was undertaken with approximately 1,000 respondents and will be used to better understand which energy issues should be the focus of the HEED’s energy design interventions and to identify households and businesses to take part in Phase 2 of the project.</v-card-text>
                    </v-card>
                  </v-expansion-panel-content>
                </v-expansion-panel>
              </v-flex>
            </v-layout>
            <v-layout row wrap class="mt-2">
              <v-flex xs12>
                <v-expansion-panel popout>
                  <v-expansion-panel-content>
                    <div slot="header">Sensors</div>
                    <v-divider></v-divider>
                    <v-card>
                      <v-card-text class="text-xs-left">
                        In November 2017, a workshop was held in Rwanda where a shortlist of energy interventions and scenarios for sensor-based monitoring were devised. A full list can be found in the “Interactive timeline” document. From this shortlist, the priorities are:
                        <v-layout row wrap>
                          <v-flex xs12 class="ml-5">
                            <ul>
                              <li>Solar street-lighting</li>
                              <li>Solar Minigrids / Solar home systems</li>
                              <li>Improved cookstoves</li>
                              <li>Solar mobile lanterns</li>
                            </ul>
                          </v-flex>
                        </v-layout>
                      </v-card-text>
                    </v-card>
                  </v-expansion-panel-content>
                </v-expansion-panel>
              </v-flex>
            </v-layout>
            <v-layout row wrap class="mt-2">
              <v-flex xs12>
                <v-expansion-panel popout>
                  <v-expansion-panel-content>
                    <div slot="header">Sensing system design</div>
                    <v-divider></v-divider>
                    <v-card class="text-xs-center">
                      <img class="mt-1" src="src/assets/5hwbC3.png" alt="" height="200px"><br>
                      <div class="text-xs-center">Sensing System Concept</div>
                      <v-card-text>To collect the data about the utility, usage and usability (as well as the fitness for purpose) of planned energy interventions above, sensor-based monitoring systems (or sensing systems) will be devised, integrated with the energy interventions and deployed.
                        Generically, the sensing system concept in focus is shown in Figure 1. One or many sensor nodes take readings from their integrated sensors (e.g., temperature, electricity). These sensor readings are wirelessly transmitted to a local server where the data is collated. The local server, 1) stores the data, and 2) forwards the sensed data to a remote server based at Coventry University. The sensor data collected will then be used for analysis, visualisation, evaluation, and any data modelling necessary to answer the various research questions or test hypothesis.
                        The sensing system must enable real-time data transfer to a remote server based at Coventry University. This will be beneficial for 1) the deployment of the user Interfaces that will be developed for use in the camp by residents and managers, 2) any control algorithms that depend on sensor data input- e.g. microgrid energy apportionment.
                        Since there is no fixed internet provision at deployment sites, access to the internet will be over the cellular network.
                      </v-card-text>
                    </v-card>
                  </v-expansion-panel-content>
                </v-expansion-panel>
              </v-flex>
            </v-layout>
            <v-layout row wrap class="mt-2">
              <v-flex xs12>
                <v-expansion-panel popout>
                  <v-expansion-panel-content>
                    <div slot="header">Solar streetlight design</div>
                    <v-divider></v-divider>
                    <v-card class="text-xs-center">
                      <img class="mt-1" src="src/assets/EWK0DW.png" alt="" height="200px"><br>
                      <div class="text-xs-center">Solar streetlight Design</div>
                      <v-card-text class="text-xs-left">Figure 2 shows a typical design for the street-lighting, which will be used a basis for development. The solar light will comprise of a solar panel, charge controller, a leisure battery, 36W LED streetlight, battery storage box, streetlight column and lighting bracket. The solar streetlight lamp will be equipped a dusk till dawn sensor, this sensor will ensure the streetlight only during hours of darkness.
                        The sensor-based monitoring system will measure
                        <v-layout row wrap>
                          <v-flex xs12 class="ml-5">
                            <ol>
                              <li>The pedestrian footfall (both pre- and post- intervention)</li>
                              <li>The energy consumption and generation of the solar streetlight</li>
                              <li>The energy consumed, and the usage, of the mobile charging station</li>
                            </ol>
                          </v-flex>
                        </v-layout>
                        We are using: Raspberry PI + Victron Charge controller (with associated monitoring) + Relay for controlling mobile phone charging.
                      </v-card-text>
                    </v-card>
                  </v-expansion-panel-content>
                </v-expansion-panel>
              </v-flex>
            </v-layout>
            <v-layout row wrap class="mt-2">
              <v-flex xs12>
                <v-expansion-panel popout>
                  <v-expansion-panel-content>
                    <div slot="header">Microgrid Monitoring</div>
                    <v-divider></v-divider>
                    <v-card>
                      <v-card-text class="text-xs-left">
                        These studies focus primarily on the energy generated by the solar microgrid and total load consumed, however, they do not disaggregate energy into component usage. To further disaggregate energy and understand how refugees/IDPs consume energy, we will additionally monitor 1) per circuit (supply, ring-main, lighting) energy consumption, and 2) per appliance energy consumption.
                        In the HELP project the sensor-based monitoring package for microgrids is as follows:
                        <v-layout row wrap>
                          <v-flex xs12 class="ml-5">
                            <ol>
                              <li>Current and voltage measurements of solar generation: measured from the solar charge controller, connected to a RaspberryPi</li>
                              <li>Current and voltage measurements of energy consumption: measured from the energy inverter, connected to a RaspberryPi</li>
                              <li>Per home energy consumption (measured on the supply line): measured from a current sensor, connected to a Zolertia Firefly</li>
                              <li>Per circuit (ring-main, lighting) energy consumption: measured from a current sensor, connected to a Zolertia Firefly</li>
                              <li>Individual appliance energy consumption: measured by an Individual Appliance Monitor, which transmits to a RaspberryPi deployed in the household</li>
                              <li>Local weather conditions: Measured by a weather station deployed in the community</li>
                            </ol>
                          </v-flex>
                        </v-layout>
                        The sensor modalities are just indicative, when the final design for the microgrid is known, additional sensing modalities may be included, or some modalities removed.
                      </v-card-text>
                    </v-card>
                  </v-expansion-panel-content>
                </v-expansion-panel>
              </v-flex>
            </v-layout>
            <v-layout row wrap class="mt-2">
              <v-flex xs12>
                <v-expansion-panel popout>
                  <v-expansion-panel-content>
                    <div slot="header">Improved Cookstoves</div>
                    <v-divider></v-divider>
                    <v-card class="text-xs-center">
                      <img class="mt-1" src="src/assets/jtTfYc.jpg" alt="" height="200px"><br>
                      <div class="text-xs-center">Three stones cook stove</div>
                      <v-card-text class="text-xs-left">Traditional cooking methods, such as the three stones method, are still the primary method for cooking in refugee camps. However, they consume a lot of energy, and the smoke produced affects people’s health. In the HELP project we will compare the energy performance and air quality of improved cookstoves to traditional methods.
                        For cooking, refugees generally use traditional wood burning methods, such as the three stones method, figure 5. These traditional methods are often performed in confined spaces, which have a detrimental effect on health due to poor air quality.Improved cookstoves (ICSs) have been developed by many researchers, companies, and NGO’s to 1) reduce the energy
                        required for cooking and 2) improve air quality. For the HELP project we aim to:
                        <v-layout row wrap>
                          <v-flex xs12 class="ml-5">
                            <ol>
                              <li>Compare the energy performance of ICSs compared to traditional methods</li>
                              <li>Compare the air quality in ICS use environments and to those where traditional methods are used.</li>
                            </ol>
                          </v-flex>
                        </v-layout>
                        These aims will be met through the development of Stove Use Monitors (SUMs)
                        For the SUM we are using: Arduino MKR1400 + SD protoshield + thermocouple (for cooking temperatures) + si7021 temperature sensor (surface level temperature)
                      </v-card-text>
                    </v-card>
                  </v-expansion-panel-content>
                </v-expansion-panel>
              </v-flex>
            </v-layout>
            <v-layout row wrap class="mt-2">
              <v-flex xs12>
                <v-expansion-panel popout>
                  <v-expansion-panel-content>
                    <div slot="header">Solar Mobile Lanterns</div>
                    <v-divider></v-divider>
                    <v-card class="text-xs-center">
                      <img class="mt-1" src="src/assets/l85fzc.jpg" alt="" height="200px"><br>
                      <v-card-text class="text-xs-left">
                        Solar mobile lanterns are a popular way for refugees to receive light at night. However, little is known about how they are used and their efficiency. Therefore, the following questions are raised:
                        <v-layout row wrap>
                          <v-flex xs12 class="ml-5">
                            <ul>
                              <li>How often are mobile lanterns used? </li>
                              <li>Are the used as mobile devices or static? </li>
                              <li>Are they charged correctly? </li>
                              <li>Does their use change with the introduction of streetlights?</li>
                            </ul>
                          </v-flex>
                        </v-layout>
                        For mobile lantern sensing, we are using:  Arduino MKR1400 + SD protoshield + ADXL345 accelerometer + an in-house designed energy monitoring circuit.
                      </v-card-text>
                    </v-card>
                  </v-expansion-panel-content>
                </v-expansion-panel>
              </v-flex>
            </v-layout>
            <v-layout row wrap class="mt-2">
              <v-flex xs12>
                <v-expansion-panel popout>
                  <v-expansion-panel-content>
                    <div slot="header">Surveys</div>
                    <v-divider></v-divider>
                    <v-card class="text-xs-center">
                      <v-layout row wrap>
                        <v-flex xs6>
                          <img class="mt-1" src="src/assets/step0001.png" alt="" height="200px" ><br>
                          <div class="text-xs-center">HEED energy surveys undertaken in Rwanda</div>
                        </v-flex>
                        <v-flex xs6>
                          <img class="mt-1" src="src/assets/step0002.png" alt="" height="200px"><br>
                          <div class="text-xs-center">HEED energy surveys undertaken in Nepal</div>
                        </v-flex>
                      </v-layout>
                      <v-card-text class="text-xs-left">
                        In Rwanda and Nepal, the case study countries in which the HEED project is being undertaken, refugees and displaced people do not have access to sufficient energy to fulfil their basic needs and live fulfilling, safe and productive lives. The first step in addressing these problems is to understand the energy needs, priorities and aspirations of the communities in which the HEED project is working.
                        One of the most important methodological tools developed to inform the design interventions associated with the HEED project is a detailed quantitative survey of three different groups of energy users:
                        <v-layout row wrap>
                          <v-flex xs12 class="ml-5">
                            <ul>
                              <li>households living in different parts of the camps / settlement;</li>
                              <li>entrepreneurs running small businesses within the camps and settlements in which we are working; and</li>
                              <li>those responsible for community facilities such as schools and health clinics.</li>
                            </ul>
                          </v-flex>
                        </v-layout>
                        The survey was designed and delivered by our research partner Practical Action. The survey was delivered in March and April 2018 with the support of community enumerators employed within each setting. More than 1,000 survey interviews were undertaken in total. The majority of interviews were undertaken across three refugee camps in Rwanda with a smaller, but nonetheless substantial, number of interviews undertaken in the IDP settlements in Nepal.
                        These results of the survey are currently being analysed and will enable the HEED project to assess current energy usages as well as energy needs and aspirations in the two countries. This analysis will, in turn, be used to inform the design of the most appropriate interventions to be implemented in Phase 2 of the project.
                      </v-card-text>
                    </v-card>
                  </v-expansion-panel-content>
                </v-expansion-panel>
              </v-flex>
            </v-layout>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </div>
</template>


<script>
import Sidebar from '../sidebar/Sidebar.vue'
import loggedInMixin from '../../mixins/loggedInMixin'

export default{
  components: {
    "sidebar": Sidebar
  },
  data(){
    return{

    }
  },
  mixins:[loggedInMixin]
}
</script>
