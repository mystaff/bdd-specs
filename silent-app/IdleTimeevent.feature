#
# Feature: Idle Time event
#
# Created with BDD Editor on: 6 August, 2019
#
# Please follow us at @bddeditor AND if you find this tool useful please share with friends and colleagues!
#

@Idle-time 
Feature: Idle Time event

  @No-Idle-time 
  Scenario: 1 Test Silent app when there is no activity on laptop
    Given Install Silent app on Windows OS
    And Inactive time setting is OFF
    When A user plays movie
    And User should not click keyboard or mouse 
    Then App should still track time till laptop is ON

  @Idle-time-3-mins 
  Scenario: 2 Test Silent app when there is no activity on laptop copy
    Given Install Silent app on Windows OS
    And Inactive time setting is ON
    And Inactive time starts after 3 mins
    When A software installation is going on for more than 5 mins
    And User should not click keyboard or mouse 
    Then App should stop tracking time after 3 mins of inactivity

  @Idle-time-6-mins 
  Scenario: 3 Test Silent app when there is no activity on laptop
    Given Install Silent app on Windows OS
    And Inactive time setting is ON
    And Inactive time starts after 6 mins
    When A software installation is going on for more than 7 mins
    And User should not click keyboard or mouse 
    Then App should stop tracking time after 6 mins of inactivity

  @Idle-time-9-mins 
  Scenario: 4 Test Silent app when there is no activity on laptop
    Given Install Silent app on Windows OS
    And Inactive time setting is ON
    And Inactive time starts after 9 mins
    When A user plays 10 mins  video on laptop
    And User should not click keyboard or mouse 
    Then App should stop tracking time after 9 mins of inactivity

  @Idle-time-15-mins 
  Scenario: 5 Test Silent app when there is no activity on laptop 
    Given Install Silent app on Windows OS
    And Inactive time setting is ON
    And Inactive time starts after 15 mins
    When A user plays 20 mins video on laptop
    And User should not click keyboard or mouse 
    Then App should stop tracking time after 15 mins of inactivity

  @Idle-time-30-mins 
  Scenario: 6 Test Silent app when there is no activity on laptop 
    Given Install Silent app on Windows OS
    And Inactive time setting is ON
    And Inactive time starts after 30 mins
    When A user plays movie on laptop
    And User should not click keyboard or mouse 
    Then App should stop tracking time after 30 mins of inactivity

  @Idle-time-1-hour 
  Scenario: 7 Test Silent app when there is no activity on laptop  copy
    Given Install Silent app on Windows OS
    And Inactive time setting is ON
    And Inactive time starts after 1 hour
    When A user plays movie on laptop
    And User should not click keyboard or mouse 
    Then App should stop tracking time after 1 hour of inactivity
