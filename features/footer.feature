Feature: Forbes Footer Navigation

  Scenario Outline: Validate core sections link visibility in the footer
    Given I navigate to the Forbes homepage
    Then the "<Section>" link should be visible in the footer

    Examples:
      | Section      |
      | Billionaires |
      | Innovation   |
      | Leadership   |

  Scenario: Verify Forbes logo redirects to the homepage
    Given I navigate to the Forbes homepage
    When I click the "Forbes" logo in the footer
    Then I should be redirected to the Forbes homepage
