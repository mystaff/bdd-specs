#
# Feature: Sleep or Resume events
#
Created by Sandy on: 2 August, 2019

@Silent-app 
Feature: Sleep or Resume events

Background:
	Given Install Silent app on Windows OS

  @Sleep-mode 
  Scenario: 1 Test Silent app when the laptop goes in Sleep mode
    When User closes laptop lid
    Then Silent app should stop tracking time

  @Sleep-mode 
  Scenario: 2 Test Silent app when the laptop goes in Sleep mode
    When User clicks power button once
    Then Silent app should stop tracking time

  @Resume-mode 
  Scenario: 3 Test Silent app when the laptop resume from sleep mode
    When User clicks power button
    And User enter password to the lock screen
    Then Silent app should resume tracking time
