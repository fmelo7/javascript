package com.example.model;

import static org.junit.Assert.assertNotNull;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.setup.MockMvcBuilders.webAppContextSetup;

import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.context.SpringBootTest.WebEnvironment;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.web.context.WebApplicationContext;

@RunWith(SpringRunner.class)
@SpringBootTest(webEnvironment = WebEnvironment.RANDOM_PORT)
public class PersonRestTest {

	@Autowired
	protected WebApplicationContext wac;

	private MockMvc mockMvc;

	@Before
	public void setUp() throws Exception {

		this.mockMvc = webAppContextSetup(this.wac).build();
	}

	@After
	public void tearDown() throws Exception {

	}

	@Test
	public void test() throws Exception {

		MvcResult result = mockMvc.perform(get("/people"))
				.andExpect(status().isOk())
				.andReturn();

		assertNotNull(result.getResponse().getContentAsString());
	}
}
