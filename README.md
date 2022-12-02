# Development

### Link to Deployed Website
If you used the stencil code, this is `https://<your GitHub username>.github.io/<name of your repository>`

### Goal and Value of the Application
For this project, I wanted to create a site for a cafe where the user could order online. To be mindful of the various types of customers, this site enables the user to sort by popular items and by price (from lowest to highest). From these choices, the user could also filter the items based on what type of product they'd like to choose from and dietary restrictions if they have any. Working simulataneously, the user is able to visually see and read the cafe's products and add these to their cart and remove them if they no longer wanted to order it. Finally, the user can see the cart's total. 

### Usability Principles Considered
In terms of usability, I leveraged a layout with a reading path where it started from the top center with messages before dividing into three sections: the filters/sorting component, the menu, and the cart. 

### Organization of Components
For this application, an Item component was used to pass in an element from the menu data set. Using this component, I was able to render an Item card which would display the name of the product, its description, and price. 

### How Data is Passed Down Through Components
For data to be passed down through components, it was important to map each element in the data to an index for the div to return a proper component. Taking the object from the data, it is further disected to fit the proper parts of the component (name, description, and price). 

### How the User Triggers State Changes
In order for the user to trigger state changes, they would have to click on either the radio buttons or checkboxes. Using useState, the filters was indicated through an Array which was prefilled with false values. Once the button was clicked, the Array was updated so that the cards would be rendered to match the filter. Likewise, sorting was done using the useState of React so that once the radio buttons were clicked, the sorting state was updated to the specific value, enabling the cards to be sorted and rendered appropriately. 

