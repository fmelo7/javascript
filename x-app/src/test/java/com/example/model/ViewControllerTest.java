package com.example.model;

import static org.hamcrest.CoreMatchers.containsString;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.view;
import static org.springframework.test.web.servlet.setup.MockMvcBuilders.webAppContextSetup;

import org.junit.Before;
import org.junit.Ignore;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.context.SpringBootTest.WebEnvironment;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.web.context.WebApplicationContext;

@RunWith(SpringRunner.class)
@SpringBootTest(webEnvironment = WebEnvironment.RANDOM_PORT)
public class ViewControllerTest {

	@Autowired
	protected WebApplicationContext wac;

	private MockMvc mockMvc;

	@Before
	public void setup() throws Exception {

		//this.mockMvc = webAppContextSetup(this.wac).alwaysExpect(status().isOk()).build();
		this.mockMvc = webAppContextSetup(this.wac).build();
	}

	@Test
	public void homeView() throws Exception {

		this.mockMvc.perform(get("/"))
				.andExpect(view().name(containsString("home")))
				.andExpect(status().isOk());
	}

	@Test
	public void viewName() throws Exception {

		this.mockMvc.perform(get("/views/cart"))
				.andExpect(view().name(containsString("views/cart")))
				.andExpect(status().isOk());
	}

	@Test
	@Ignore
	public void uriTemplate() throws Exception {

		this.mockMvc.perform(get("/views/pathVariables/bar/apple"))
				.andExpect(view().name(containsString("views/html")));
	}
}
