#
# Feature: Lock or Unlock events
#
# Created with BDD Editor on: 2 August, 2019
#
# Please follow us at @bddeditor AND if you find this tool useful please share with friends and colleagues!
#

@Silent-app 
Feature: Lock or Unlock events

  @lock-mode 
  Scenario: 1 Test Silent app when the laptop is locked
    Given Install Silent app on Windows OS
    When User clicks 'Windows+L' on keyboard
    And Laptop gets locked
    Then App should stop tracking time

  @lock-mode 
  Scenario: 2 Test Silent app when the laptop is locked
    Given Install Silent app on Windows OS
    When User clicks 'ALT+CONTROL+DELETE' buttons together on keyboard
    And User click on 'Lock' button on the screen
    Then App should stop tracking time

  @lock-mode 
  Scenario: 3 Test Silent app when the laptop is locked 
    Given Install Silent app on Windows OS
    Given Set inactivity time for lock screen from screensaver
    When Laptop is idle for selected inactive time
    And Laptop locked automatically 
    Then App should stop tracking time

  @Unlock-mode 
  Scenario: 4 Test Silent app when the laptop is unlocked
    Given Install Silent app on Windows OS
    Given Laptop screen is locked
    When Click anywhere on the screen
    And Enter password on logon screen
    And Unlock screen
    Then App should start tracking time
    And User should see the tracking time on Timeline report
