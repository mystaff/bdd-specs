#
# Feature: Network On or Off events
#
# Created by Sandy Tarke: 13 August, 2019
#

@Network-on-off 
Feature: Network On or Off events

Background:
	Given Install Silent app on Windows OS

  @Network-On 
  Scenario: 1 Test Silent app with Network is On
    Given Internet is connected with good speed
    When User is working on laptop
    Then Silent app should track time
    And Upload the tracking data to webapp

  @Network-Off 
  Scenario: 2 Test Silent app with Network is Off
    Given Internet is disconnected 
    When User is working on laptop 
    Then Silent app should track time
    And App will not upload data till the network is not connected

  @Low-network 
  Scenario: 3 Test Silent app with Network is slow
    Given Low internet speed
    When User is working on laptop 
    And The internet speed slows down
    Then Silent app should keep tracking time
    And App should try to upload data with some periodical intervals
