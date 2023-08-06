import React, { useEffect, useRef, useState } from 'react';
import grapesjs from 'grapesjs';
import 'grapesjs/dist/css/grapes.min.css';
export const GrapeJSEditor = () => {
    const editorRef = useRef(null);
  
    useEffect(() => {
      const editor = grapesjs.init({
        canvas: {
          styles: ['/App.css'], // Link your custom stylesheet
        },
        container: editorRef.current,
        // Your GrapeJS configuration options go here
        height: '500px',
        width: '100%',
        storageManager: false, // Disable saving to localStorage for this example
        components: '<img src="path/to/your-image.jpg" style="width: 100px; height: 100px;">', // Initial content of the editor with an image
        plugins: ['gjs-blocks-basic', 'gjs-plugin-forms'],
        styleManager: {
          sectors: [
            {
              name: 'Dimension',
              open: false,
              buildProps: ['width', 'min-height', 'padding'],
            },
            {
              name: 'Extra',
              open: false,
              buildProps: ['background-color'],
            },
            {
              name: 'Typography', // Add a new sector for typography settings
              open: false,
              buildProps: ['font-family'],
            },
          ],
        },
      });
  
      // Add custom components, blocks, or plugins to the editor
      editor.BlockManager.add('editable-component-edit', {
        label: 'Editable Component (Edit)',
        content: EditCompo, // Assuming EditCompo is a valid variable holding the HTML content as a string
      });
  
      editor.BlockManager.add('editable-component-tailwind', {
        label: 'Editable Component (Tailwind)',
        content: TailwindCompo, // Assuming TailwindCompo is a valid variable holding the HTML content as a string
      });
  
      // Define the component's HTML and React component to be used during rendering
      editor.DomComponents.addType('editable-component-edit', {
        // Define the HTML template of the component
        model: {
          defaults: {
            tagName: 'div',
            attributes: {
              contenteditable: false, // Make the component non-editable
            },
          },
        },
  
        // Define how the component should be rendered
        view: {
          // React component to be used for rendering
          component: () => null,
        },
      });
  
      // Define the component's HTML and React component to be used during rendering
      editor.DomComponents.addType('editable-component-tailwind', {
        // Define the HTML template of the component
        model: {
          defaults: {
            tagName: 'div',
            attributes: {
              contenteditable: false, // Make the component non-editable
            },
          },
        },
  
        // Define how the component should be rendered
        view: {
          // React component to be used for rendering
          component: () => null,
        },
      });
  
      // Register the custom color changer block
      editor.BlockManager.add('color-changer', {
        label: 'Color Changer Block',
        content: '<div data-gjs-type="color-changer">Change my color</div>',
      });
  
      // Add the color trait to the color changer block
      editor.on('component:add', component => {
        if (component.get('type') === 'color-changer') {
          component.addTrait('background-color', {
            type: 'color-input',
            label: 'Background Color',
            name: 'style.background-color',
          });
        }
      });
  
      // Apply font and background color to all elements
      editor.on('load', () => {
        const canvas = editor.Canvas.getBody();
        canvas.style.fontFamily = 'Arial, sans-serif'; // Set the desired font-family
        canvas.style.backgroundColor = '#f0f0f0'; // Set the desired background color
      });
  
      // Function to change the image on a button click
      const changeImage = () => {
        editor.runCommand('open-assets');
      };
  
      // Attach the changeImage function to a button click event or any other trigger
      const changeImageButton = document.getElementById('change-image-btn');
      if (changeImageButton) {
        changeImageButton.addEventListener('click', changeImage);
      }
  
      return () => {
        editor.destroy();
      };
    }, []);
  
    return (
      <>
        <div ref={editorRef}></div>
        <button id="change-image-btn">Change Image</button>
      </>
    );
  };
  // export default GrapeJSEditor;
  
  
  
  
  const EditCompo=()=>{
  const[dd,setdd]=useState("https://www.simplilearn.com/ice9/free_resources_article_thumb/what_is_image_Processing.jpg")
    return ( <form  style="color: red; text-align:center;">
    <div>
      <label for="email">Email:</label>
      <input type="email" id="email" placeholder="Enter email"  required />
      <img src={dd}/>
    </div>
    <div>
      <label for="password">Password:</label>
      <input  type="password" id="password" readonly />
    </div>
    <button type="submit">Login</button>
  </form>)
  }
  
  
  
  
  
  
  
  
  const TailwindCompo = () => {
    return (
      <form className="custom-form" style={{ color: "red" }}>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            placeholder="Enter email"
            className="custom-input"
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            placeholder="Password"
            className="custom-input"
            required
            readOnly // Add the readOnly attribute to make it non-editable
          />
        </div>
        <button type="submit" className="custom-button">
          Login
        </button>
      </form>
    );
  };